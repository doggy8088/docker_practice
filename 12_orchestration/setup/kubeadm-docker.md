## 使用 kubeadm 部署 Kubernetes (使用 Docker)

`kubeadm` 提供了 `kubeadm init` 以及 `kubeadm join` 這兩個指令，作為快速建立 `Kubernetes` 叢集的最佳實踐。

> ⚠️ **重要說明**：自 Kubernetes 1.24 起，內建 `dockershim` 已被移除，Kubernetes 預設不再直接使用 Docker Engine 作為容器執行時 (CRI)。因此，**更推薦參考** 同目錄下的《[使用 kubeadm 部署 Kubernetes (CRI 使用 containerd)](kubeadm.md)》。
>
> 本文件主要用於歷史環境/學習目的：如果你確實需要在較新版本中繼續使用 Docker Engine，通常需要額外部署 `cri-dockerd` 並在 `kubeadm init/join` 中指定 `--cri-socket`。

### 安裝 Docker

參考[安裝 Docker](../../03_install/README.md) 一節安裝 Docker。

### 安裝 **kubelet****kubeadm****kubectl**

需要在每台機器上安裝以下的軟體套件：

#### Ubuntu/Debian

執行以下指令：

```bash
$ K8S_MINOR="v1.35"

$ sudo apt-get update
$ sudo apt-get install -y ca-certificates curl gpg

$ sudo install -m 0755 -d /etc/apt/keyrings
$ curl -fsSL "https://pkgs.k8s.io/core:/stable:/${K8S_MINOR}/deb/Release.key" | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
$ sudo chmod a+r /etc/apt/keyrings/kubernetes-apt-keyring.gpg

$ echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/${K8S_MINOR}/deb/ /" | sudo tee /etc/apt/sources.list.d/kubernetes.list > /dev/null

$ sudo apt-get update
$ sudo apt-get install -y kubelet kubeadm kubectl

$ sudo apt-mark hold kubelet kubeadm kubectl
```

#### CentOS/Fedora

執行以下指令：

```bash
$ K8S_MINOR="v1.35"

$ cat <<EOF | sudo tee /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://pkgs.k8s.io/core:/stable:/${K8S_MINOR}/rpm/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://pkgs.k8s.io/core:/stable:/${K8S_MINOR}/rpm/repodata/repomd.xml.key
EOF

$ sudo yum install -y kubelet kubeadm kubectl
```

### 修改核心的執行引數

本節涵蓋了相關內容與詳細描述，主要探討以下幾個方面：

#### 載入核心模組

執行以下指令：

```bash
$ cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

$ sudo modprobe overlay
$ sudo modprobe br_netfilter
```

#### 停用 swap (必須)

kubelet 預設要求停用 swap，否則可能導致初始化失敗或節點無法加入叢集。

```bash
$ sudo swapoff -a

## 如需永久停用，可在 /etc/fstab 中註解 swap 對應行

```

執行以下指令：

```bash
$ cat <<EOF | sudo tee /etc/sysctl.d/99-kubernetes-cri.conf
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF

## 應用設定

$ sysctl --system
```

### 設定 kubelet

為了讓 kubelet 正確執行，我們需要對其進行一些必要的設定。

#### 概述

總體概述了以下內容。

#### 修改 `kubelet.service`

`/etc/systemd/system/kubelet.service.d/10-proxy-ipvs.conf` 寫入以下內容

```bash
## 啟用 ipvs 相關核心模組

[Service]
ExecStartPre=-/sbin/modprobe ip_vs
ExecStartPre=-/sbin/modprobe ip_vs_rr
ExecStartPre=-/sbin/modprobe ip_vs_wrr
ExecStartPre=-/sbin/modprobe ip_vs_sh
```

執行以下指令應用設定。

```bash
$ sudo systemctl daemon-reload
```

### 部署

安裝設定完成後，我們將分別在 Master 節點和 Worker 節點上進行部署操作。

#### master

執行以下指令：

```bash
$ sudo kubeadm init --image-repository registry.cn-hangzhou.aliyuncs.com/google_containers \
      --pod-network-cidr 10.244.0.0/16 \
      --v 5 \
      --ignore-preflight-errors=all
```

* `--pod-network-cidr 10.244.0.0/16` 引數與後續 CNI 外掛有關，這裡以 `flannel` 為例，若後續部署其他型別的網路外掛請更改此引數。

> 執行可能出現錯誤，例如缺少依賴套件，根據提示安裝即可。

執行成功會輸出

```bash
...
[addons] Applied essential addon: CoreDNS
I1116 12:35:13.270407   86677 request.go:538] Throttling request took 181.409184ms, request: POST:https://192.168.199.100:6443/api/v1/namespaces/kube-system/serviceaccounts
I1116 12:35:13.470292   86677 request.go:538] Throttling request took 186.088112ms, request: POST:https://192.168.199.100:6443/api/v1/namespaces/kube-system/configmaps
[addons] Applied essential addon: kube-proxy

Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.199.100:6443 --token cz81zt.orsy9gm9v649e5lf \
    --discovery-token-ca-cert-hash sha256:5edb316fd0d8ea2792cba15cdf1c899a366f147aa03cba52d4e5c5884ad836fe
```

#### node 工作節點

在 **另一主機** 重複 **部署** 小節以前的步驟，安裝設定好 kubelet。根據提示，加入到叢集。

```bash
$ kubeadm join 192.168.199.100:6443 --token cz81zt.orsy9gm9v649e5lf \
    --discovery-token-ca-cert-hash sha256:5edb316fd0d8ea2792cba15cdf1c899a366f147aa03cba52d4e5c5884ad836fe
```

### 檢視服務

所有服務啟動後，檢視本地實際執行的 Docker 容器。這些服務大概分為三類：主節點服務、工作節點服務和其它服務。

#### 主節點服務

* `apiserver` 是整個系統的對外介面，提供 RESTful 方式供用戶端和其它元件呼叫；

* `scheduler` 負責對資源進行排程，分配某個 pod 到某個節點上；

* `controller-manager` 負責管理控制器，包括 endpoint-controller (重新整理服務和 pod 的關聯訊息) 和 replication-controller (維護某個 pod 的複製為設定的數值)。

#### 工作節點服務

* `proxy` 為 pod 上的服務提供訪問的代理。

#### 其它服務

* Etcd 是所有狀態的儲存資料庫；

### 使用

將 `/etc/kubernetes/admin.conf` 複製到 `~/.kube/config`

執行 `$ kubectl get all -A` 檢視啟動的服務。

由於未部署 CNI 外掛，CoreDNS 未正常啟動。如何使用 Kubernetes，請參考後續章節。

### 部署 CNI

這裡以 `flannel` 為例進行介紹。

#### 概述

總體概述了以下內容。

#### flannel

檢查 podCIDR 設定

```bash
$ kubectl get node -o yaml | grep CIDR

## 輸出

    podCIDR: 10.244.0.0/16
    podCIDRs:
```

```bash
$ kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/v0.26.1/Documentation/kube-flannel.yml
```

### master 節點預設不能執行 pod

如果用 `kubeadm` 部署一個單節點叢集，預設情況下無法使用，請執行以下指令解除限制

```bash
$ kubectl taint nodes --all node-role.kubernetes.io/master-

## 部分較新版本使用 control-plane taint

## $ kubectl taint nodes --all node-role.kubernetes.io/control-plane-

## 恢復預設值

## $ kubectl taint nodes NODE_NAME node-role.kubernetes.io/master=true:NoSchedule

...
```

### 參考文件

* [官方文件](https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)

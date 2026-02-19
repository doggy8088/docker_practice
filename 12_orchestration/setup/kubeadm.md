## 使用 kubeadm 部署 kubernetes（CRI 使用 containerd）

`kubeadm` 提供了 `kubeadm init` 以及 `kubeadm join` 這兩個指令作為快速建立 `kubernetes` 叢集的最佳實踐。

> **版本說明**：Kubernetes 版本更新較快（約每 4 個月一個新版本），本文件基於 Kubernetes 1.35 編寫。請訪問 [Kubernetes 官方發布頁](https://kubernetes.io/releases/) 獲取最新版本訊息。

### 安裝 containerd

參考 [安裝 Docker](../../03_install/README.md) 一節新增 apt/yum 源，之後執行如下指令。

```bash
## debian 系

$ sudo apt install containerd.io

## rhel 系

$ sudo yum install containerd.io
```

### 設定 containerd

新建 `/etc/systemd/system/cri-containerd.service` 檔案

```
[Unit]
Description=containerd container runtime for kubernetes
Documentation=https://containerd.io
After=network.target local-fs.target

[Service]
ExecStartPre=-/sbin/modprobe overlay
ExecStart=/usr/bin/containerd --config /etc/cri-containerd/config.toml

Type=notify
Delegate=yes
KillMode=process
Restart=always
RestartSec=5
## Having non-zero Limit*s causes performance problems due to accounting overhead

## in the kernel. We recommend using cgroups to do container-local accounting.

LimitNPROC=infinity
LimitCORE=infinity
LimitNOFILE=infinity
## Comment TasksMax if your systemd version does not supports it.

## Only systemd 226 and above support this version.

TasksMax=infinity
OOMScoreAdjust=-999

[Install]
WantedBy=multi-user.target
```

新建 `/etc/cri-containerd/config.toml` containerd 設定檔案

```toml
version = 2
## persistent data location

root = "/var/lib/cri-containerd"
## runtime state information

state = "/run/cri-containerd"
plugin_dir = ""
disabled_plugins = []
required_plugins = []
## set containerd's OOM score

oom_score = 0

[grpc]
  address = "/run/cri-containerd/cri-containerd.sock"
  tcp_address = ""
  tcp_tls_cert = ""
  tcp_tls_key = ""
  # socket uid

  uid = 0
  # socket gid

  gid = 0
  max_recv_message_size = 16777216
  max_send_message_size = 16777216

[debug]
  address = ""
  format = "json"
  uid = 0
  gid = 0
  level = ""

[metrics]
  address = "127.0.0.1:1338"
  grpc_histogram = false

[cgroup]
  path = ""

[timeouts]
  "io.containerd.timeout.shim.cleanup" = "5s"
  "io.containerd.timeout.shim.load" = "5s"
  "io.containerd.timeout.shim.shutdown" = "3s"
  "io.containerd.timeout.task.state" = "2s"

[plugins]
  [plugins."io.containerd.gc.v1.scheduler"]
    pause_threshold = 0.02
    deletion_threshold = 0
    mutation_threshold = 100
    schedule_delay = "0s"
    startup_delay = "100ms"
  [plugins."io.containerd.grpc.v1.cri"]
    disable_tcp_service = true
    stream_server_address = "127.0.0.1"
    stream_server_port = "0"
    stream_idle_timeout = "4h0m0s"
    enable_selinux = false
    selinux_category_range = 1024
    sandbox_image = "registry.cn-hangzhou.aliyuncs.com/google_containers/pause:3.10"
    stats_collect_period = 10
    # systemd_cgroup = false

    enable_tls_streaming = false
    max_container_log_line_size = 16384
    disable_cgroup = false
    disable_apparmor = false
    restrict_oom_score_adj = false
    max_concurrent_downloads = 3
    disable_proc_mount = false
    unset_seccomp_profile = ""
    tolerate_missing_hugetlb_controller = true
    disable_hugetlb_controller = true
    ignore_image_defined_volumes = false
    [plugins."io.containerd.grpc.v1.cri".containerd]
      snapshotter = "overlayfs"
      default_runtime_name = "runc"
      no_pivot = false
      disable_snapshot_annotations = false
      discard_unpacked_layers = false
      [plugins."io.containerd.grpc.v1.cri".containerd.runtimes]
        [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc]
          runtime_type = "io.containerd.runc.v2"
          pod_annotations = []
          container_annotations = []
          privileged_without_host_devices = false
          base_runtime_spec = ""
          [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
            # SystemdCgroup enables systemd cgroups.

            SystemdCgroup = true
            # BinaryName is the binary name of the runc binary.

            # BinaryName = "runc"

            # BinaryName = "crun"

            # NoPivotRoot disables pivot root when creating a container.

            # NoPivotRoot = false

            # NoNewKeyring disables new keyring for the container.

            # NoNewKeyring = false

            # ShimCgroup places the shim in a cgroup.

            # ShimCgroup = ""

            # IoUid sets the I/O's pipes uid.

            # IoUid = 0

            # IoGid sets the I/O's pipes gid.

            # IoGid = 0

            # Root is the runc root directory.

            Root = ""

            # CriuPath is the criu binary path.

            # CriuPath = ""

            # CriuImagePath is the criu image path

            # CriuImagePath = ""

            # CriuWorkPath is the criu work path.

            # CriuWorkPath = ""

    [plugins."io.containerd.grpc.v1.cri".cni]
      bin_dir = "/opt/cni/bin"
      conf_dir = "/etc/cni/net.d"
      max_conf_num = 1
      conf_template = ""
    [plugins."io.containerd.grpc.v1.cri".registry]
      config_path = "/etc/cri-containerd/certs.d"
      [plugins."io.containerd.grpc.v1.cri".registry.headers]
        # Foo = ["bar"]

    [plugins."io.containerd.grpc.v1.cri".image_decryption]
      key_model = ""
    [plugins."io.containerd.grpc.v1.cri".x509_key_pair_streaming]
      tls_cert_file = ""
      tls_key_file = ""
  [plugins."io.containerd.internal.v1.opt"]
    path = "/opt/cri-containerd"
  [plugins."io.containerd.internal.v1.restart"]
    interval = "10s"
  [plugins."io.containerd.metadata.v1.bolt"]
    content_sharing_policy = "shared"
  [plugins."io.containerd.monitor.v1.cgroups"]
    no_prometheus = false
  [plugins."io.containerd.runtime.v2.task"]
    platforms = ["linux/amd64"]
  [plugins."io.containerd.service.v1.diff-service"]
    default = ["walking"]
  [plugins."io.containerd.snapshotter.v1.devmapper"]
    root_path = ""
    pool_name = ""
    base_image_size = ""
    async_remove = false
```

### 安裝 **kubelet****kubeadm****kubectl****cri-tools****kubernetes-cni**

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
$ sudo apt-get install -y kubelet kubeadm kubectl cri-tools kubernetes-cni

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

$ sudo yum install -y kubelet kubeadm kubectl cri-tools kubernetes-cni
```

### 修改核心的執行引數

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

#### 停用 swap（必須）

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
$ systemctl enable cri-containerd

$ systemctl start cri-containerd

$ sudo kubeadm init \
      --image-repository registry.cn-hangzhou.aliyuncs.com/google_containers \
      --pod-network-cidr 10.244.0.0/16 \
      --cri-socket /run/cri-containerd/cri-containerd.sock \
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

在 **另一主機**重複**部署** 小節以前的步驟，安裝設定好 kubelet。根據提示，加入到叢集。

```bash
$ systemctl enable cri-containerd

$ systemctl start cri-containerd

$ kubeadm join 192.168.199.100:6443 \
    --token cz81zt.orsy9gm9v649e5lf \
    --discovery-token-ca-cert-hash sha256:5edb316fd0d8ea2792cba15cdf1c899a366f147aa03cba52d4e5c5884ad836fe \
    --cri-socket /run/cri-containerd/cri-containerd.sock
```

### 檢視服務

所有服務啟動後，透過 `crictl` 檢視本地實際執行的容器。這些服務大概分為三類：主節點服務、工作節點服務和其它服務。

```bash
CONTAINER_RUNTIME_ENDPOINT=/run/cri-containerd/cri-containerd.sock crictl ps -a
```

#### 主節點服務

* `apiserver` 是整個系統的對外介面，提供 RESTful 方式供用戶端和其它元件呼叫；

* `scheduler` 負責對資源進行排程，分配某個 pod 到某個節點上；

* `controller-manager` 負責管理控制器，包括 endpoint-controller（重新整理服務和 pod 的關聯訊息）和 replication-controller（維護某個 pod 的複製為設定的數值）。

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
* [Container runtimes](https://kubernetes.io/docs/setup/production-environment/container-runtimes/#containerd)

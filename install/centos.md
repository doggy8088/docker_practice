# CentOS 安裝 Docker

>警告：切勿在沒有設定 Docker YUM 源的情況下直接使用 yum 指令安裝 Docker.

## 準備工作

### 系統要求

Docker 支援 64 位版本 CentOS 7/8，並且要求核心版本不低於 3.10。 CentOS 7 滿足最低核心的要求，但由於核心版本比較低，部分功能（如 `overlay2` 儲存層驅動）無法使用，並且部分功能可能不太穩定。

### 解除安裝舊版本

舊版本的 Docker 稱為 `docker` 或者 `docker-engine`，使用以下指令解除安裝舊版本：

```bash
$ sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine
```

## 使用 yum 安裝

執行以下指令安裝依賴套件：

```bash
$ sudo yum install -y yum-utils
```

鑑於國內網路問題，強烈建議使用國內源，官方源請在註解中檢視。

執行下面的指令新增 `yum` 軟體源：

```bash
$ sudo yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

$ sudo sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo

# 官方源
# $ sudo yum-config-manager \
#     --add-repo \
#     https://download.docker.com/linux/centos/docker-ce.repo
```

如果需要測試版本的 Docker 請執行以下指令：

```bash
$ sudo yum-config-manager --enable docker-ce-test
```

### 安裝 Docker

更新 `yum` 軟體源快取，並安裝 `docker-ce`。

```bash
$ sudo yum install docker-ce docker-ce-cli containerd.io
```

## CentOS8 額外設定

由於 CentOS8 防火牆使用了 `nftables`，但 Docker 尚未支援 `nftables`， 我們可以使用如下設定使用 `iptables`：

更改 `/etc/firewalld/firewalld.conf`

```bash
# FirewallBackend=nftables
FirewallBackend=iptables
```

或者執行如下指令：

```bash
$ firewall-cmd --permanent --zone=trusted --add-interface=docker0

$ firewall-cmd --reload
```

## 使用指令碼自動安裝

在測試或開發環境中 Docker 官方為了簡化安裝流程，提供了一套便捷的安裝指令碼，CentOS 系統上可以使用這套指令碼安裝，另外可以透過 `--mirror` 選項使用國內源進行安裝：

> 若你想安裝測試版的 Docker, 請從 test.docker.com 獲取指令碼

```bash
# $ curl -fsSL test.docker.com -o get-docker.sh
$ curl -fsSL get.docker.com -o get-docker.sh
$ sudo sh get-docker.sh --mirror Aliyun
# $ sudo sh get-docker.sh --mirror AzureChinaCloud
```

執行這個指令後，指令碼就會自動的將一切準備工作做好，並且把 Docker 的穩定(stable)版本安裝在系統中。

## 啟動 Docker

```bash
$ sudo systemctl enable docker
$ sudo systemctl start docker
```

## 建立 docker 使用者組

預設情況下，`docker` 指令會使用 [Unix socket](https://en.wikipedia.org/wiki/Unix_domain_socket) 與 Docker 引擎通訊。而只有 `root` 使用者和 `docker` 組的使用者才可以訪問 Docker 引擎的 Unix socket。出於安全考慮，一般 Linux 系統上不會直接使用 `root` 使用者。因此，更好地做法是將需要使用 `docker` 的使用者加入 `docker` 使用者組。

建立 `docker` 組：

```bash
$ sudo groupadd docker
```

將當前使用者加入 `docker` 組：

```bash
$ sudo usermod -aG docker $USER
```

退出當前終端並重新登入，進行如下測試。

## 測試 Docker 是否安裝正確

```bash
$ docker run --rm hello-world

Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
b8dfde127a29: Pull complete
Digest: sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

若能正常輸出以上訊息，則說明安裝成功。

## 映象加速

如果在使用過程中發現拉取 Docker 映象十分緩慢，可以設定 Docker [國內映象加速](mirror.md)。

## 新增核心引數

如果在 CentOS 使用 Docker 看到下面的這些警告訊息：

```bash
WARNING: bridge-nf-call-iptables is disabled
WARNING: bridge-nf-call-ip6tables is disabled
```

請新增核心設定引數以啟用這些功能。

```bash
$ sudo tee -a /etc/sysctl.conf <<-EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
```

然後重新載入 `sysctl.conf` 即可

```bash
$ sudo sysctl -p
```

## 參考文件

* [Docker 官方 CentOS 安裝文件](https://docs.docker.com/install/linux/docker-ce/centos/)。
* https://firewalld.org/2018/07/nftables-backend
* https://github.com/moby/libnetwork/issues/2496

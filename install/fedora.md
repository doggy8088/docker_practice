# Fedora 安裝 Docker

>警告：切勿在沒有設定 Docker dnf 源的情況下直接使用 dnf 指令安裝 Docker.

## 準備工作

### 系統要求

Docker 支援以下版本的 [Fedora](https://getfedora.org/) 作業系統：

* 33
* 34

### 解除安裝舊版本

舊版本的 Docker 稱為 `docker` 或者 `docker-engine`，使用以下指令解除安裝舊版本：

```bash
$ sudo dnf remove docker \
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

## 使用 dnf 安裝

執行以下指令安裝依賴套件：

```bash
$ sudo dnf -y install dnf-plugins-core
```

鑑於國內網路問題，強烈建議使用國內源，官方源請在註解中檢視。

執行下面的指令新增 `dnf` 軟體源：

```bash
$ sudo dnf config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/fedora/docker-ce.repo

$ sudo sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo

# 官方源
# $ sudo dnf config-manager \
#    --add-repo \
#    https://download.docker.com/linux/fedora/docker-ce.repo
```

如果需要測試版本的 Docker 請使用以下指令：

```bash
$ sudo dnf config-manager --set-enabled docker-ce-test
```

你也可以停用測試版本的 Docker

```bash
$ sudo dnf config-manager --set-disabled docker-ce-test
```

### 安裝 Docker

更新 `dnf` 軟體源快取，並安裝 `docker-ce`。

```bash
$ sudo dnf update
$ sudo dnf install docker-ce docker-ce-cli containerd.io
```

你也可以使用以下指令安裝指定版本的 Docker

```bash
$ dnf list docker-ce  --showduplicates | sort -r

docker-ce.x86_64          18.06.1.ce-3.fc28                     docker-ce-stable

$ sudo dnf -y install docker-ce-18.06.1.ce
```

## 使用指令碼自動安裝

在測試或開發環境中 Docker 官方為了簡化安裝流程，提供了一套便捷的安裝指令碼，Debian 系統上可以使用這套指令碼安裝，另外可以透過 `--mirror` 選項使用國內源進行安裝：

> 若你想安裝測試版的 Docker, 請從 test.docker.com 獲取指令碼

```bash
# $ curl -fsSL test.docker.com -o get-docker.sh
$ curl -fsSL get.docker.com -o get-docker.sh
$ sudo sh get-docker.sh --mirror Aliyun
# $ sudo sh get-docker.sh --mirror AzureChinaCloud
```

執行這個指令後，指令碼就會自動的將一切準備工作做好，並且把 Docker 最新穩定(stable)版本安裝在系統中。

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

## 參考文件

* [Docker 官方 Fedora 安裝文件](https://docs.docker.com/install/linux/docker-ce/fedora)。

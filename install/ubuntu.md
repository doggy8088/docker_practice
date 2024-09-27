# Ubuntu 安裝 Docker

>警告：切勿在沒有設定 Docker APT 源的情況下直接使用 apt 指令安裝 Docker.

## 準備工作

### 系統要求

Docker 支援諸多版本的 [Ubuntu](https://ubuntu.com/server) 作業系統。但是較舊的版本上將不會有Docker新版本的持續更新，以截至2024年中的幾個 Ubuntu LTS（Long Term Support，長期支援）版本為例：

* Ubuntu Noble 24.04 (LTS)，Docker v27.2.1
* Ubuntu Jammy 22.04 (LTS), Docker v27.2.1
* Ubuntu Focal 20.04 (LTS), Docker v27.2.1
* Ubuntu Bionic 18.04 (LTS)，Docker v24.0.2

在 Ubuntu LTS 版本上，目前 Docker 支援 amd64、arm64、armhf、ppc64el、s390x 等 5 個平台；而非 LTS 版本支援的平台通常較少。同時，LTS 版本會獲得 5 年的升級維護支援，這樣的系統會獲得更長期的安全保障，因此在生產環境中推薦使用 LTS 版本。

### 解除安裝舊版本

舊版本的 Docker 稱為 `docker` 或者 `docker-engine`，使用以下指令解除安裝舊版本：

```bash
$ for pkg in docker \
           docker-engine \
           docker.io \
           docker-doc \
           docker-compose \
           podman-docker \
           containerd \
           runc;
do
    sudo apt remove $pkg;
done
```

## 使用 APT 安裝

由於 `apt` 源使用 HTTPS 以確保軟體下載過程中不被篡改。因此，我們首先需要新增使用 HTTPS 傳輸的軟體套件以及 CA 證書。

```bash
$ sudo apt update

$ sudo apt install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

鑑於國內網路問題，強烈建議使用國內源，官方源請在註解中檢視。

為了確認所下載軟體套件的合法性，需要新增軟體源的 `GPG` 金鑰。

```bash
$ curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg


# 官方源
# $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

然後，我們需要向 `sources.list` 中新增 Docker 軟體源

```bash
$ echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


# 官方源
# $ echo \
#   "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
#   $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

>以上指令會新增穩定版本的 Docker APT 映象源，如果需要測試版本的 Docker 請將 stable 改為 test。

### 安裝 Docker

更新 apt 軟體套件快取，並安裝 `docker-ce`：

```bash
$ sudo apt update

$ sudo apt install docker-ce docker-ce-cli containerd.io
```

## 使用指令碼自動安裝

在測試或開發環境中 Docker 官方為了簡化安裝流程，提供了一套便捷的安裝指令碼，Ubuntu 系統上可以使用這套指令碼安裝，另外可以透過 `--mirror` 選項使用國內源進行安裝：

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

## 參考文件

* [Docker 官方 Ubuntu 安裝文件](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

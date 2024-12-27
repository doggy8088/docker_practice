# 樹莓派卡片電腦安裝 Docker

>警告：切勿在沒有設定 Docker APT 源的情況下直接使用 apt 指令安裝 Docker.

## 系統要求

Docker 不僅支援 `x86_64` 架構的電腦，同時也支援 `ARM` 架構的電腦，本小節內容以樹莓派單片電腦為例講解 `ARM` 架構安裝 Docker。

Docker 支援以下版本的 [Raspberry Pi OS](https://www.raspberrypi.org/software/operating-systems/) 作業系統：

* Raspberry Pi OS Buster
* Raspberry Pi OS Bullseye
* Raspberry Pi OS Bookworm

*注：* `Raspberry Pi OS` 由樹莓派的開發與維護機構 [樹莓派基金會](https://www.raspberrypi.org/) 官方支援，並推薦用作樹莓派的首選系統，其基於 `Debian`。

## 使用 APT 安裝

由於 apt 源使用 HTTPS 以確保軟體下載過程中不被篡改。因此，我們首先需要新增使用 HTTPS 傳輸的軟體套件以及 CA 證書。

```bash
$ sudo apt-get update

$ sudo apt-get install \
     apt-transport-https \
     ca-certificates \
     curl \
     gnupg2 \
     lsb-release \
     software-properties-common
```

鑑於國內網路問題，強烈建議使用國內源，官方源請在註解中檢視。

為了確認所下載軟體套件的合法性，需要新增軟體源的 GPG 金鑰。

```bash
$ curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/raspbian/gpg | sudo apt-key add -


# 官方源
# $ curl -fsSL https://download.docker.com/linux/raspbian/gpg | sudo apt-key add -
```

然後，我們需要向 `sources.list` 中新增 Docker 軟體源：

```bash
$ sudo add-apt-repository \
    "deb [arch=armhf] https://mirrors.aliyun.com/docker-ce/linux/raspbian \
    $(lsb_release -cs) \
    stable"


# 官方源
# $ sudo add-apt-repository \
#    "deb [arch=armhf] https://download.docker.com/linux/raspbian \
#    $(lsb_release -cs) \
#    stable"
```

>以上指令會新增穩定版本的 Docker APT 源，如果需要測試版本的 Docker 請將 stable 改為 test。

#### 報錯解決辦法

在 `Raspberry Pi OS Bullseye/Bookworm` 中，新增 Docker 軟體源的步驟可能會出現如下報錯:

```bash
Traceback (most recent call last):
 File "/usr/bin/add-apt-repository", line 95, in <module>
   sp = SoftwareProperties(options=options)
 File "/usr/lib/python3/dist-packages/softwareproperties/SoftwareProperties.py", line 109, in __init__
   self.reload_sourceslist()
 File "/usr/lib/python3/dist-packages/softwareproperties/SoftwareProperties.py", line 599, in reload_sourceslist
   self.distro.get_sources(self.sourceslist)    
 File "/usr/lib/python3/dist-packages/aptsources/distro.py", line 91, in get_sources
   raise NoDistroTemplateException(
aptsources.distro.NoDistroTemplateException: Error: could not find a distribution template for Raspbian/bullseye
```

透過以下指令手動新增映象源到 `/etc/apt/sources.list` 檔案中即可解決:

```bash
$ sudo echo "deb [arch=armhf] https://mirrors.aliyun.com/docker-ce/linux/raspbian $(lsb_release -cs) stable" | sudo tee -a /etc/apt/sources.list


# 官方源
# $ sudo echo "deb [arch=armhf] https://download.docker.com/linux/raspbian $(lsb_release -cs) stable" | sudo tee -a /etc/apt/sources.list
```

### 安裝 Docker

更新 apt 軟體套件快取，並安裝 `docker-ce`。

```bash
$ sudo apt-get update

$ sudo apt-get install docker-ce
```

## 使用指令碼自動安裝

在測試或開發環境中 Docker 官方為了簡化安裝流程，提供了一套便捷的安裝指令碼，Raspberry Pi OS 系統上可以使用這套指令碼安裝，另外可以透過 `--mirror` 選項使用國內源進行安裝：

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
4ee5c797bcd7: Pull complete
Digest: sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (arm32v7)
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

*注意：* ARM 平台不能使用 `x86` 映象，檢視 Raspberry Pi OS 可使用映象請訪問 [arm32v7](https://hub.docker.com/u/arm32v7/) 或者 [arm64v8](https://hub.docker.com/u/arm64v8/)。

## 映象加速

如果在使用過程中發現拉取 Docker 映象十分緩慢，可以設定 Docker [國內映象加速](mirror.md)。

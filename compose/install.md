# 安裝與解除安裝

`Compose` 支援 Linux、macOS、Windows 10 三大平台。

`Compose` 可以透過 Python 的套件管理工具 `pip` 進行安裝，也可以直接下載編譯好的二進位檔案使用，甚至能夠直接在 Docker 容器中執行。

`Docker Desktop for Mac/Windows` 自帶 `docker-compose` 二進位檔案，安裝 Docker 之後可以直接使用。

```bash
$ docker-compose --version

docker-compose version 1.27.4, build 40524192
```

Linux 系統請使用以下介紹的方法安裝。

## 二進位封裝

在 Linux 上的也安裝十分簡單，從 [官方 GitHub Release](https://github.com/docker/compose/releases) 處直接下載編譯好的二進位檔案即可。

例如，在 Linux 64 位系統上直接下載對應的二進位封裝。

```bash
$ sudo curl -L https://github.com/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

# 國內使用者可以使用以下方式加快下載
$ sudo curl -L https://download.fastgit.org/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

$ sudo chmod +x /usr/local/bin/docker-compose
```

## PIP 安裝

*注：* `x86_64` 架構的 Linux 建議按照上邊的方法下載二進位封裝進行安裝，如果您電腦的架構是 `ARM` (例如，樹莓派)，再使用 `pip` 安裝。

這種方式是將 Compose 當作一個 Python 應用來從 pip 源中安裝。

執行安裝指令：

```bash
$ sudo pip install -U docker-compose
```

可以看到類似如下輸出，說明安裝成功。

```bash
Collecting docker-compose
  Downloading docker-compose-1.27.4.tar.gz (149kB): 149kB downloaded
...
Successfully installed docker-compose cached-property requests texttable websocket-client docker-py dockerpty six enum34 backports.ssl-match-hostname ipaddress
```

## bash 補全指令

```bash
$ curl -L https://raw.githubusercontent.com/docker/compose/1.27.4/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose
```

## 解除安裝

如果是二進位封裝方式安裝的，刪除二進位檔案即可。

```bash
$ sudo rm /usr/local/bin/docker-compose
```

如果是透過 `pip` 安裝的，則執行如下指令即可刪除。

```bash
$ sudo pip uninstall docker-compose
```

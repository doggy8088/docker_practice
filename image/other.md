# 其它製作映象的方式

除了標準的使用 `Dockerfile` 生成映象的方法外，由於各種特殊需求和歷史原因，還提供了一些其它方法用以生成映象。

## 從 rootfs 壓縮封裝匯入

格式：`docker import [選項] <檔案>|<URL>|- [<倉庫名>[:<標籤>]]`

壓縮封裝可以是本地檔案、遠端 Web 檔案，甚至是從標準輸入中得到。壓縮封裝將會在映象 `/` 目錄展開，並直接作為映象第一層送出。

比如我們想要建立一個 [OpenVZ](https://openvz.org) 的 Ubuntu 16.04 [樣板](https://wiki.openvz.org/Download/template/precreated)的映象：

```bash
$ docker import \
    http://download.openvz.org/template/precreated/ubuntu-16.04-x86_64.tar.gz \
    openvz/ubuntu:16.04

Downloading from http://download.openvz.org/template/precreated/ubuntu-16.04-x86_64.tar.gz
sha256:412b8fc3e3f786dca0197834a698932b9c51b69bd8cf49e100c35d38c9879213
```

這條指令自動下載了 `ubuntu-16.04-x86_64.tar.gz` 檔案，並且作為根檔案系統展開匯入，並儲存為映象 `openvz/ubuntu:16.04`。

匯入成功後，我們可以用 `docker image ls` 看到這個匯入的映象：

```bash
$ docker image ls openvz/ubuntu
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
openvz/ubuntu       16.04               412b8fc3e3f7        55 seconds ago      505MB
```

如果我們檢視其歷史的話，會看到描述中有匯入的檔案連結：

```bash
$ docker history openvz/ubuntu:16.04
IMAGE               CREATED              CREATED BY          SIZE                COMMENT
f477a6e18e98        About a minute ago                       214.9 MB            Imported from http://download.openvz.org/template/precreated/ubuntu-16.04-x86_64.tar.gz
```

## Docker 映象的匯入和匯出 `docker save` 和 `docker load`

Docker 還提供了 `docker save` 和 `docker load` 指令，用以將映象儲存為一個檔案，然後傳輸到另一個位置上，再載入進來。這是在沒有 Docker Registry 時的做法，現在已經不推薦，映象遷移應該直接使用 Docker Registry，無論是直接使用 Docker Hub 還是使用內網私有 Registry 都可以。

### 儲存映象

使用 `docker save` 指令可以將映象儲存為歸檔檔案。

比如我們希望儲存這個 `alpine` 映象。

```bash
$ docker image ls alpine
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
alpine              latest              baa5d63471ea        5 weeks ago         4.803 MB
```

儲存映象的指令為：

```bash
$ docker save alpine -o filename
$ file filename
filename: POSIX tar archive
```

這裡的 filename 可以為任意名稱甚至任意字尾名，但檔案的本質都是歸檔檔案

**注意：如果同名則會覆蓋（沒有警告）**

若使用 `gzip` 壓縮：

```bash
$ docker save alpine | gzip > alpine-latest.tar.gz
```

然後我們將 `alpine-latest.tar.gz` 檔案複製到了到了另一個機器上，可以用下面這個指令載入映象：

```bash
$ docker load -i alpine-latest.tar.gz
Loaded image: alpine:latest
```

如果我們結合這兩個指令以及 `ssh` 甚至 `pv` 的話，利用 Linux 強大的通道，我們可以寫一個指令完成從一個機器將映象遷移到另一個機器，並且帶進度條的功能：

```bash
docker save <映象名> | bzip2 | pv | ssh <使用者名>@<主機名> 'cat | docker load'
```

# 私有倉庫

有時候使用 Docker Hub 這樣的公共倉庫可能不方便，使用者可以建立一個本地倉庫供私人使用。

本節介紹如何使用本地倉庫。

[`docker-registry`](https://docs.docker.com/registry/) 是官方提供的工具，可以用於建立私有的映象倉庫。本文內容基於 [`docker-registry`](https://github.com/docker/distribution) v2.x 版本。

## 安裝執行 docker-registry

### 容器執行

你可以使用官方 `registry` 映象來執行。

```bash
$ docker run -d -p 5000:5000 --restart=always --name registry registry
```

這將使用官方的 `registry` 映象來啟動私有倉庫。預設情況下，倉庫會被建立在容器的 `/var/lib/registry` 目錄下。你可以透過 `-v` 引數來將映象檔案存放在本地的指定路徑。例如下面的例子將上傳的映象放到本地的 `/opt/data/registry` 目錄。

```bash
$ docker run -d \
    -p 5000:5000 \
    -v /opt/data/registry:/var/lib/registry \
    registry
```

## 在私有倉庫上傳、搜尋、下載映象

建立好私有倉庫之後，就可以使用 `docker tag` 來標記一個映象，然後推送它到倉庫。例如私有倉庫地址為 `127.0.0.1:5000`。

先在本機檢視已有的映象。

```bash
$ docker image ls
REPOSITORY                        TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
ubuntu                            latest              ba5877dc9bec        6 weeks ago         192.7 MB
```

使用 `docker tag` 將 `ubuntu:latest` 這個映象標記為 `127.0.0.1:5000/ubuntu:latest`。

格式為 `docker tag IMAGE[:TAG] [REGISTRY_HOST[:REGISTRY_PORT]/]REPOSITORY[:TAG]`。

```bash
$ docker tag ubuntu:latest 127.0.0.1:5000/ubuntu:latest
$ docker image ls
REPOSITORY                        TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
ubuntu                            latest              ba5877dc9bec        6 weeks ago         192.7 MB
127.0.0.1:5000/ubuntu:latest      latest              ba5877dc9bec        6 weeks ago         192.7 MB
```

使用 `docker push` 上傳標記的映象。

```bash
$ docker push 127.0.0.1:5000/ubuntu:latest
The push refers to repository [127.0.0.1:5000/ubuntu]
373a30c24545: Pushed
a9148f5200b0: Pushed
cdd3de0940ab: Pushed
fc56279bbb33: Pushed
b38367233d37: Pushed
2aebd096e0e2: Pushed
latest: digest: sha256:fe4277621f10b5026266932ddf760f5a756d2facd505a94d2da12f4f52f71f5a size: 1568
```

用 `curl` 檢視倉庫中的映象。

```bash
$ curl 127.0.0.1:5000/v2/_catalog
{"repositories":["ubuntu"]}
```

這裡可以看到 `{"repositories":["ubuntu"]}`，表明映象已經被成功上傳了。

先刪除已有映象，再嘗試從私有倉庫中下載這個映象。

```bash
$ docker image rm 127.0.0.1:5000/ubuntu:latest

$ docker pull 127.0.0.1:5000/ubuntu:latest
Pulling repository 127.0.0.1:5000/ubuntu:latest
ba5877dc9bec: Download complete
511136ea3c5a: Download complete
9bad880da3d2: Download complete
25f11f5fb0cb: Download complete
ebc34468f71d: Download complete
2318d26665ef: Download complete

$ docker image ls
REPOSITORY                         TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
127.0.0.1:5000/ubuntu:latest       latest              ba5877dc9bec        6 weeks ago         192.7 MB
```

## 設定非 https 倉庫地址

如果你不想使用 `127.0.0.1:5000` 作為倉庫地址，比如想讓本網段的其他主機也能把映象推送到私有倉庫。你就得把例如 `192.168.199.100:5000` 這樣的內網地址作為私有倉庫地址，這時你會發現無法成功推送映象。

這是因為 Docker 預設不允許非 `HTTPS` 方式推送映象。我們可以透過 Docker 的設定選項來取消這個限制，或者檢視下一節設定能夠透過 `HTTPS` 訪問的私有倉庫。

### Ubuntu 16.04+, Debian 8+, centos 7

對於使用 `systemd` 的系統，請在 `/etc/docker/daemon.json` 中寫入如下內容（如果檔案不存在請新建該檔案）

```json
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ],
  "insecure-registries": [
    "192.168.199.100:5000"
  ]
}
```

>注意：該檔案必須符合 `json` 規範，否則 Docker 將不能啟動。

## 其他

對於 Docker Desktop for Windows 、 Docker Desktop for Mac 在設定中的 `Docker Engine` 中進行編輯 ，增加和上邊一樣的字串即可。

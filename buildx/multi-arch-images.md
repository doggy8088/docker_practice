# 使用 buildx 建立多種系統架構支援的 Docker 映象

在之前的版本中建立多種系統架構支援的 Docker 映象，要想使用統一的名字必須使用 [`$ docker manifest`](../image/manifest.md) 指令。

在 Docker 19.03+ 版本中可以使用 `$ docker buildx build` 指令使用 `BuildKit` 建立映象。該指令支援 `--platform` 引數可以同時建立支援多種系統架構的 Docker 映象，大大簡化了建立步驟。

## 新建 `builder` 實例

Docker for Linux 不支援建立 `arm` 架構映象，我們可以執行一個新的容器讓其支援該屬性，Docker 桌面版無需進行此項設定。

```bash
$ docker run --rm --privileged tonistiigi/binfmt:latest --install all
```

由於 Docker 預設的 `builder` 實例不支援同時指定多個 `--platform`，我們必須首先建立一個新的 `builder` 實例。同時由於國內拉取映象較緩慢，我們可以使用設定了 [映象加速地址](https://github.com/moby/buildkit/blob/master/docs/buildkitd.toml.md)  的 [`dockerpracticesig/buildkit:master`](https://github.com/docker-practice/buildx) 映象替換官方映象。

> 如果你有私有的映象加速器，可以基於 https://github.com/docker-practice/buildx 建立自己的 buildkit 映象並使用它。

```bash
# 適用於國內環境
$ docker buildx create --use --name=mybuilder-cn --driver docker-container --driver-opt image=dockerpracticesig/buildkit:master

# 適用於騰訊雲環境(騰訊雲主機、coding.net 持續整合)
$ docker buildx create --use --name=mybuilder-cn --driver docker-container --driver-opt image=dockerpracticesig/buildkit:master-tencent

# $ docker buildx create --name mybuilder --driver docker-container

$ docker buildx use mybuilder
```

## 建立映象

新建 Dockerfile 檔案。

```docker
FROM --platform=$TARGETPLATFORM alpine

RUN uname -a > /os.txt

CMD cat /os.txt
```

使用 `$ docker buildx build` 指令建立映象，注意將 `myusername` 替換為自己的 Docker Hub 使用者名。

`--push` 引數表示將建立好的映象推送到 Docker 倉庫。

```bash
$ docker buildx build --platform linux/arm,linux/arm64,linux/amd64 -t myusername/hello . --push

# 檢視映象訊息
$ docker buildx imagetools inspect myusername/hello
```

在不同架構執行該映象，可以得到該架構的訊息。

```bash
# arm
$ docker run -it --rm myusername/hello
Linux buildkitsandbox 4.9.125-linuxkit #1 SMP Fri Sep 7 08:20:28 UTC 2018 armv7l Linux

# arm64
$ docker run -it --rm myusername/hello
Linux buildkitsandbox 4.9.125-linuxkit #1 SMP Fri Sep 7 08:20:28 UTC 2018 aarch64 Linux

# amd64
$ docker run -it --rm myusername/hello
Linux buildkitsandbox 4.9.125-linuxkit #1 SMP Fri Sep 7 08:20:28 UTC 2018 x86_64 Linux
```

## 架構相關變數

`Dockerfile` 支援如下架構相關的變數

**TARGETPLATFORM** 

建立映象的目標平台，例如 `linux/amd64`, `linux/arm/v7`, `windows/amd64`。

**TARGETOS** 

`TARGETPLATFORM` 的 OS 型別，例如 `linux`, `windows`

**TARGETARCH** 

`TARGETPLATFORM` 的架構型別，例如 `amd64`, `arm`

**TARGETVARIANT**

`TARGETPLATFORM` 的變種，該變數可能為空，例如 `v7`

**BUILDPLATFORM**

建立映象主機平台，例如 `linux/amd64`

**BUILDOS** 

`BUILDPLATFORM` 的 OS 型別，例如 `linux`

**BUILDARCH** 

`BUILDPLATFORM` 的架構型別，例如 `amd64`

**BUILDVARIANT** 

`BUILDPLATFORM` 的變種，該變數可能為空，例如 `v7`

### 使用舉例

例如我們要建立支援 `linux/arm/v7` 和 `linux/amd64` 兩種架構的映象。假設已經生成了兩個平台對應的二進位檔案：

* `bin/dist-linux-arm`
* `bin/dist-linux-amd64`

那麼 `Dockerfile` 可以這樣書寫：

```docker
FROM scratch

# 使用變數必須申明
ARG TARGETOS

ARG TARGETARCH

COPY bin/dist-${TARGETOS}-${TARGETARCH} /dist

ENTRYPOINT ["dist"]
```

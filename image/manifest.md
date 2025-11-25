# 建立多種系統架構支援的 Docker 映象 -- docker manifest 指令詳解

我們知道使用映象建立一個容器，該映象必須與 Docker 宿主機系統架構一致，例如 `Linux x86_64` 架構的系統中只能使用 `Linux x86_64` 的映象建立容器。

> Windows、macOS 除外，其使用了 [binfmt_misc](https://docs.docker.com/docker-for-mac/multi-arch/) 提供了多種架構支援，在 Windows、macOS 系統上 (x86_64) 可以執行 arm 等其他架構的映象。

例如我們在 `Linux x86_64` 中建立一個 `username/test` 映象。

```docker
FROM alpine

CMD echo 1
```

建立映象後推送到 Docker Hub，之後我們嘗試在樹莓派 `Linux arm64v8` 中使用這個映象。

```bash
$ docker run -it --rm username/test
```

可以發現這個映象根本獲取不到。

要解決這個問題，通常採用的做法是透過映象名區分不同系統架構的映象，例如在 `Linux x86_64` 和 `Linux arm64v8` 分別建立 `username/test` 和 `username/arm64v8-test` 映象。執行時使用對應架構的映象即可。

這樣做顯得很繁瑣，那麼有沒有一種方法讓 Docker 引擎根據系統架構自動拉取對應的映象呢？

我們發現在 `Linux x86_64` 和 `Linux arm64v8` 架構的電腦中分別使用 `golang:alpine` 映象執行容器 `$ docker run golang:alpine go version` 時，容器能夠正常的執行。

這是什麼原因呢？

原因就是 `golang:alpine` 官方映象有一個 [`manifest` 清單 (`manifest list`)](https://docs.docker.com/registry/spec/manifest-v2-2/)。

當用戶獲取一個映象時，Docker 引擎會首先查詢該映象是否有 `manifest` 清單，如果有的話 Docker 引擎會按照 Docker 執行環境（系統及架構）查詢出對應映象（例如 `golang:alpine`）。如果沒有的話會直接獲取映象（例如上例中我們建立的 `username/test`）。

我們可以使用 `$ docker manifest inspect golang:alpine` 檢視這個 `manifest` 清單的結構。

```bash
$ docker manifest inspect golang:alpine
```

```json
{
   "schemaVersion": 2,
   "mediaType": "application/vnd.docker.distribution.manifest.list.v2+json",
   "manifests": [
      {
         "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
         "size": 1365,
         "digest": "sha256:5e28ac423243b187f464d635bcfe1e909f4a31c6c8bce51d0db0a1062bec9e16",
         "platform": {
            "architecture": "amd64",
            "os": "linux"
         }
      },
      {
         "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
         "size": 1365,
         "digest": "sha256:2945c46e26c9787da884b4065d1de64cf93a3b81ead1b949843dda1fcd458bae",
         "platform": {
            "architecture": "arm",
            "os": "linux",
            "variant": "v7"
         }
      },
      {
         "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
         "size": 1365,
         "digest": "sha256:87fff60114fd3402d0c1a7ddf1eea1ded658f171749b57dc782fd33ee2d47b2d",
         "platform": {
            "architecture": "arm64",
            "os": "linux",
            "variant": "v8"
         }
      },
      {
         "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
         "size": 1365,
         "digest": "sha256:607b43f1d91144f82a9433764e85eb3ccf83f73569552a49bc9788c31b4338de",
         "platform": {
            "architecture": "386",
            "os": "linux"
         }
      },
      {
         "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
         "size": 1365,
         "digest": "sha256:25ead0e21ed5e246ce31e274b98c09aaf548606788ef28eaf375dc8525064314",
         "platform": {
            "architecture": "ppc64le",
            "os": "linux"
         }
      },
      {
         "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
         "size": 1365,
         "digest": "sha256:69f5907fa93ea591175b2c688673775378ed861eeb687776669a48692bb9754d",
         "platform": {
            "architecture": "s390x",
            "os": "linux"
         }
      }
   ]
}
```

可以看出 `manifest` 清單中包含了不同系統架構所對應的映象 `digest` 值，這樣 Docker 就可以在不同的架構中使用相同的 `manifest` (例如 `golang:alpine`) 獲取對應的映象。

下面介紹如何使用 `$ docker manifest` 指令建立並推送 `manifest` 清單到 Docker Hub。

## 建立映象

首先在 `Linux x86_64` 建立 `username/x8664-test` 映象。並在 `Linux arm64v8` 中建立 `username/arm64v8-test` 映象，建立好之後推送到 Docker Hub。

## 建立 `manifest` 清單

```bash
# $ docker manifest create MANIFEST_LIST MANIFEST [MANIFEST...]
$ docker manifest create username/test \
      username/x8664-test \
      username/arm64v8-test
```

當要修改一個 `manifest` 清單時，可以加入 `-a` 或 `--amend` 引數。

## 設定 `manifest` 清單

```bash
# $ docker manifest annotate [OPTIONS] MANIFEST_LIST MANIFEST
$ docker manifest annotate username/test \
      username/x8664-test \
      --os linux --arch x86_64

$ docker manifest annotate username/test \
      username/arm64v8-test \
      --os linux --arch arm64 --variant v8
```

這樣就設定好了 `manifest` 清單。

## 檢視 `manifest` 清單

```bash
$ docker manifest inspect username/test
```

## 推送 `manifest` 清單

最後我們可以將其推送到 Docker Hub。

```bash
$ docker manifest push username/test
```

## 測試

我們在 `Linux x86_64` `Linux arm64v8` 中分別執行 `$ docker run -it --rm username/test` 指令，發現可以正確的執行。

## 官方部落格

詳細瞭解 `manifest` 可以閱讀官方部落格。

* https://www.docker.com/blog/multi-arch-all-the-things/

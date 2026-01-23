# 獲取映象

之前提到過，[Docker Hub](https://hub.docker.com/search?q=&type=image) 上有大量的高質量的映象可以用，這裡我們就說一下怎麼獲取這些映象。

從 Docker 映象倉庫獲取映象的指令是 `docker pull`。其指令格式為：

```bash
$ docker pull [選項] [Docker Registry 地址[:連接埠號]/]倉庫名[:標籤]
```

具體的選項可以透過 `docker pull --help` 指令看到，這裡我們說一下映象名稱的格式。

* Docker 映象倉庫地址：地址的格式一般是 `<網域名稱/IP>[:連接埠號]`。預設地址是 Docker Hub(`docker.io`)。
* 倉庫名：如之前所說，這裡的倉庫名是兩段式名稱，即 `<使用者名>/<軟體名>`。對於 Docker Hub，如果不給出使用者名，則預設為 `library`，也就是官方映象。

比如：

```bash
$ docker pull ubuntu:24.04
18.04: Pulling from library/ubuntu
92dc2a97ff99: Pull complete
be13a9d27eb8: Pull complete
c8299583700a: Pull complete
Digest: sha256:4bc3ae6596938cb0d9e5ac51a1152ec9dcac2a1c50829c74abd9c4361e321b26
Status: Downloaded newer image for ubuntu:24.04
docker.io/library/ubuntu:24.04
```

上面的指令中沒有給出 Docker 映象倉庫地址，因此將會從 Docker Hub （`docker.io`）獲取映象。而映象名稱是 `ubuntu:24.04`，因此將會獲取官方映象 `library/ubuntu` 倉庫中標籤為 `24.04` 的映象。`docker pull` 指令的輸出結果最後一行給出了映象的完整名稱，即： `docker.io/library/ubuntu:24.04`。

從下載過程中可以看到我們之前提及的分層儲存的概念，映象是由多層儲存所構成。下載也是一層層的去下載，並非單一檔案。下載過程中給出了每一層的 ID 的前 12 位。並且下載結束後，給出該映象完整的 `sha256` 的摘要，以確保下載一致性。

在使用上面指令的時候，你可能會發現，你所看到的層 ID 以及 `sha256` 的摘要和這裡的不一樣。這是因為官方映象是一直在維護的，有任何新的 bug，或者版本更新，都會進行修復再以原來的標籤發布，這樣可以確保任何使用這個標籤的使用者可以獲得更安全、更穩定的映象。

*如果從 Docker Hub 下載映象非常緩慢，可以參照 [映象加速器](/install/mirror.md) 一節設定加速器。*

## 執行

有了映象後，我們就能夠以這個映象為基礎啟動並執行一個容器。以上麵的 `ubuntu:24.04` 為例，如果我們打算啟動裡面的 `bash` 並且進行互動式操作的話，可以執行下面的指令。

```bash
$ docker run -it --rm ubuntu:24.04 bash

root@e7009c6ce357:/# cat /etc/os-release
NAME="Ubuntu"
VERSION="24.04 LTS (Noble Numbat)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 24.04 LTS"
VERSION_ID="24.04"
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
VERSION_CODENAME=noble
UBUNTU_CODENAME=noble
```

`docker run` 就是執行容器的指令，具體格式我們會在 [容器](../container) 一節進行詳細講解，我們這裡簡要的說明一下上面用到的引數。

* `-it`：這是兩個引數，一個是 `-i`：互動式操作，一個是 `-t` 終端。我們這裡打算進入 `bash` 執行一些指令並檢視回傳結果，因此我們需要互動式終端。
* `--rm`：這個引數是說容器退出後隨之將其刪除。預設情況下，為了排障需求，退出的容器並不會立即刪除，除非手動 `docker rm`。我們這裡只是隨便執行個指令，看看結果，不需要排障和保留結果，因此使用 `--rm` 可以避免浪費空間。
* `ubuntu:24.04`：這是指用 `ubuntu:24.04` 映象為基礎來啟動容器。
* `bash`：放在映象名後的是 **指令**，這裡我們希望有個互動式 Shell，因此用的是 `bash`。

進入容器後，我們可以在 Shell 下操作，執行任何所需的指令。這裡，我們執行了 `cat /etc/os-release`，這是 Linux 常用的檢視當前系統版本的指令，從回傳的結果可以看到容器內是 `Ubuntu 24.04 LTS` 系統。

最後我們透過 `exit` 退出了這個容器。

# 網路設定

當 Docker 啟動時，會自動在主機上建立一個 `docker0` 虛擬網橋，實際上是 Linux 的一個 bridge，可以理解為一個軟體交換機。它會在掛載到它的網口之間進行轉發。

同時，Docker 隨機分配一個本地未佔用的私有網段（在 [RFC1918](https://datatracker.ietf.org/doc/html/rfc1918) 中定義）中的一個地址給 `docker0` 介面。比如典型的 `172.17.42.1`，掩碼為 `255.255.0.0`。此後啟動的容器內的網口也會自動分配一個同一網段（`172.17.0.0/16`）的地址。

當建立一個 Docker 容器的時候，同時會建立了一對 `veth pair` 介面（當資料套件傳送到一個介面時，另外一個介面也可以收到相同的資料套件）。這對接口一端在容器內，即 `eth0`；另一端在本地並被掛載到 `docker0` 網橋，名稱以 `veth` 開頭（例如 `vethAQI2QT`）。透過這種方式，主機可以跟容器通訊，容器之間也可以相互通訊。Docker 就建立了在主機和所有容器之間一個虛擬共享網路。



## 使用者自定義網路

雖然預設的 `bridge` 網路可以滿足大部分需求，但為了更好地隔離容器、或滿足特定的網路需求，我們推薦使用使用者自定義網路。

使用者可以建立 `bridge`、`overlay` 或 `macvlan` 等不同型別的自定義網路。

### 建立一個自定義 bridge 網路

```bash
$ docker network create my-net
```

### 連線容器到自定義網路

在啟動容器時，可以使用 `--network` 選項來指定網路。

```bash
$ docker run -it --rm --name busybox1 --network my-net busybox sh
$ docker run -it --rm --name busybox2 --network my-net busybox sh
```

在 `busybox1` 的終端中，可以 `ping` 通 `busybox2`。

```bash
/ # ping busybox2
PING busybox2 (172.19.0.3): 56 data bytes
64 bytes from 172.19.0.3: seq=0 ttl=64 time=0.083 ms
```

### 容器互聯的廢棄與替代

在 Docker 的早期版本中，`--link` 選項被用來連線容器。然而，這個功能現在已經被廢棄，並且不推薦在生產環境中使用。

**注意：`--link` 是一個遺留功能。它可能會在未來的版本中被移除。我們強烈建議使用使用者自定義網路來連線多個容器。**

使用自定義網路，容器之間可以透過容器名直接進行通訊，這比使用 `--link` 更加靈活和強大。

接下來的部分將介紹 Docker 的一些高階網路設定，包括 DNS 設定和連接埠對映等內容。

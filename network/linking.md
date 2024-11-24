# 容器互聯

如果你之前有 `Docker` 使用經驗，你可能已經習慣了使用 `--link` 引數來使容器互聯。

隨著 Docker 網路的完善，強烈建議大家將容器加入自定義的 Docker 網路來連線多個容器，而不是使用 `--link` 引數。

## 新建網路

下面先建立一個新的 Docker 網路。

```bash
$ docker network create -d bridge my-net
```

`-d` 引數指定 Docker 網路型別，有 `bridge` `overlay`。其中 `overlay` 網路型別用於 [Swarm mode](../swarm_mode/)，在本小節中你可以忽略它。

## 連線容器

執行一個容器並連線到新建的 `my-net` 網路

```bash
$ docker run -it --rm --name busybox1 --network my-net busybox sh
```

開啟新的終端，再執行一個容器並加入到 `my-net` 網路

```bash
$ docker run -it --rm --name busybox2 --network my-net busybox sh
```

再開啟一個新的終端檢視容器訊息

```bash
$ docker container ls

CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
b47060aca56b        busybox             "sh"                11 minutes ago      Up 11 minutes                           busybox2
8720575823ec        busybox             "sh"                16 minutes ago      Up 16 minutes                           busybox1
```

下面透過 `ping` 來證明 `busybox1` 容器和 `busybox2` 容器建立了互聯關係。

在 `busybox1` 容器輸入以下指令

```bash
/ # ping busybox2
PING busybox2 (172.19.0.3): 56 data bytes
64 bytes from 172.19.0.3: seq=0 ttl=64 time=0.072 ms
64 bytes from 172.19.0.3: seq=1 ttl=64 time=0.118 ms
```

用 ping 來測試連線 `busybox2` 容器，它會解析成 `172.19.0.3`。

同理在 `busybox2` 容器執行 `ping busybox1`，也會成功連線到。

```bash
/ # ping busybox1
PING busybox1 (172.19.0.2): 56 data bytes
64 bytes from 172.19.0.2: seq=0 ttl=64 time=0.064 ms
64 bytes from 172.19.0.2: seq=1 ttl=64 time=0.143 ms
```

這樣，`busybox1` 容器和 `busybox2` 容器建立了互聯關係。

## Docker Compose

如果你有多個容器之間需要互相連線，推薦使用 [Docker Compose](../compose)。

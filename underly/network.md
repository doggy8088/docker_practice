# Docker 網路實現

Docker 的網路實現其實就是利用了 Linux 上的網路命名空間和虛擬網路裝置（特別是 veth pair）。建議先熟悉瞭解這兩部分的基本概念再閱讀本章。

## 基本原理
首先，要實現網路通訊，機器需要至少一個網路介面（物理介面或虛擬介面）來收發資料套件；此外，如果不同子網之間要進行通訊，需要路由機制。

Docker 中的網路介面預設都是虛擬的介面。虛擬介面的優勢之一是轉發效率較高。
Linux 透過在核心中進行資料複製來實現虛擬介面之間的資料轉發，傳送介面的傳送快取中的資料套件被直接複製到接收介面的接收快取中。對於本地系統和容器內系統看來就像是一個正常的乙太網路卡，只是它不需要真正同外部網路裝置通訊，速度要快很多。

Docker 容器網路就利用了這項技術。它在本地主機和容器內分別建立一個虛擬介面，並讓它們彼此連通（這樣的一對介面叫做 `veth pair`）。

## 建立網路引數
Docker 建立一個容器的時候，會執行如下操作：
* 建立一對虛擬介面，分別放到本地主機和新容器中；
* 本地主機一端橋接到預設的 docker0 或指定網橋上，並具有一個唯一的名字，如 veth65f9；
* 容器一端放到新容器中，並修改名字作為 eth0，這個介面只在容器的命名空間可見；
* 從網橋可用地址段中獲取一個空閒地址分配給容器的 eth0，並設定預設路由到橋接網絡卡 veth65f9。

完成這些之後，容器就可以使用 eth0 虛擬網絡卡來連線其他容器和其他網路。

可以在 `docker run` 的時候透過 `--net` 引數來指定容器的網路設定，有4個可選值：
* `--net=bridge` 這個是預設值，連線到預設的網橋。
* `--net=host` 告訴 Docker 不要將容器網路放到隔離的命名空間中，即不要容器化容器內的網路。此時容器使用本地主機的網路，它擁有完全的本地主機介面訪問許可權。容器程序可以跟主機其它 root 程序一樣可以開啟低範圍的連接埠，可以訪問本地網路服務比如 D-bus，還可以讓容器做一些影響整個主機系統的事情，比如重啟主機。因此使用這個選項的時候要非常小心。如果進一步的使用 `--privileged=true`，容器會被允許直接設定主機的網路堆疊。
* `--net=container:NAME_or_ID` 讓 Docker 將新建容器的程序放到一個已存在容器的網路棧中，新容器程序有自己的檔案系統、程序清單和資源限制，但會和已存在的容器共享 IP 地址和連接埠等網路資源，兩者程序可以直接透過 `lo` 環回介面通訊。
* `--net=none` 讓 Docker 將新容器放到隔離的網路棧中，但是不進行網路設定。之後，使用者可以自己進行設定。

## 網路設定細節
使用者使用 `--net=none` 後，可以自行設定網路，讓容器達到跟平常一樣具有訪問網路的許可權。透過這個過程，可以瞭解 Docker 設定網路的細節。

首先，啟動一個 `/bin/bash` 容器，指定 `--net=none` 引數。
```bash
$ docker run -i -t --rm --net=none base /bin/bash
root@63f36fc01b5f:/#
```
在本地主機查詢容器的程序 id，併為它建立網路命名空間。
```bash
$ docker inspect -f '{{.State.Pid}}' 63f36fc01b5f
2778
$ pid=2778
$ sudo mkdir -p /var/run/netns
$ sudo ln -s /proc/$pid/ns/net /var/run/netns/$pid
```
檢查橋接網絡卡的 IP 和子網掩碼訊息。
```bash
$ ip addr show docker0
21: docker0: ...
inet 172.17.42.1/16 scope global docker0
...
```
建立一對 『veth pair』 介面 A 和 B，繫結 A 到網橋 `docker0`，並啟用它
```bash
$ sudo ip link add A type veth peer name B
$ sudo brctl addif docker0 A
$ sudo ip link set A up
```
將B放到容器的網路命名空間，命名為 eth0，啟動它並設定一個可用 IP（橋接網段）和預設閘道器。
```bash
$ sudo ip link set B netns $pid
$ sudo ip netns exec $pid ip link set dev B name eth0
$ sudo ip netns exec $pid ip link set eth0 up
$ sudo ip netns exec $pid ip addr add 172.17.42.99/16 dev eth0
$ sudo ip netns exec $pid ip route add default via 172.17.42.1
```
以上，就是 Docker 設定網路的具體過程。

當容器結束後，Docker 會清空容器，容器內的 eth0 會隨網路命名空間一起被清除，A 介面也被自動從 `docker0` 解除安裝。

此外，使用者可以使用 `ip netns exec` 指令來在指定網路命名空間中進行設定，從而設定容器內的網路。

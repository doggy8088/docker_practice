# 自定義網橋

除了預設的 `docker0` 網橋，使用者也可以指定網橋來連線各個容器。

在啟動 Docker 服務的時候，使用 `-b BRIDGE`或`--bridge=BRIDGE` 來指定使用的網橋。

如果服務已經執行，那需要先停止服務，並刪除舊的網橋。

```bash
$ sudo systemctl stop docker
$ sudo ip link set dev docker0 down
$ sudo brctl delbr docker0
```

然後建立一個網橋 `bridge0`。

```bash
$ sudo brctl addbr bridge0
$ sudo ip addr add 192.168.5.1/24 dev bridge0
$ sudo ip link set dev bridge0 up
```

檢視確認網橋建立並啟動。

```bash
$ ip addr show bridge0
4: bridge0: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state UP group default
    link/ether 66:38:d0:0d:76:18 brd ff:ff:ff:ff:ff:ff
    inet 192.168.5.1/24 scope global bridge0
       valid_lft forever preferred_lft forever
```

在 Docker 設定檔案 `/etc/docker/daemon.json` 中新增如下內容，即可將 Docker 預設橋接到建立的網橋上。

```json
{
  "bridge": "bridge0",
}
```

啟動 Docker 服務。

新建一個容器，可以看到它已經橋接到了 `bridge0` 上。

可以繼續用 `brctl show` 指令檢視橋接的訊息。另外，在容器中可以使用 `ip addr` 和 `ip route` 指令來檢視 IP 地址設定和路由訊息。

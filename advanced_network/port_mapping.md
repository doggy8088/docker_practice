# 對映容器連接埠到宿主主機的實現

預設情況下，容器可以主動訪問到外部網路的連線，但是外部網路無法訪問到容器。

## 容器訪問外部實現

容器所有到外部網路的連線，源地址都會被 NAT 成本地系統的 IP 地址。這是使用 `iptables` 的源地址偽裝操作實現的。

檢視主機的 NAT 規則。

```bash
$ sudo iptables -t nat -nL
...
Chain POSTROUTING (policy ACCEPT)
target     prot opt source               destination
MASQUERADE  all  --  172.17.0.0/16       !172.17.0.0/16
...
```

其中，上述規則將所有源地址在 `172.17.0.0/16` 網段，目標地址為其他網段（外部網路）的流量動態偽裝為從系統網絡卡發出。MASQUERADE 跟傳統 SNAT 的好處是它能動態從網絡卡獲取地址。

## 外部訪問容器實現

容器允許外部訪問，可以在 `docker run` 時候透過 `-p` 或 `-P` 引數來啟用。

不管用那種辦法，其實也是在本地的 `iptable` 的 nat 表中新增相應的規則。

使用 `-P` 時：

```bash
$ iptables -t nat -nL
...
Chain DOCKER (2 references)
target     prot opt source               destination
DNAT       tcp  --  0.0.0.0/0            0.0.0.0/0            tcp dpt:49153 to:172.17.0.2:80
```

使用 `-p 80:80` 時：

```bash
$ iptables -t nat -nL
Chain DOCKER (2 references)
target     prot opt source               destination
DNAT       tcp  --  0.0.0.0/0            0.0.0.0/0            tcp dpt:80 to:172.17.0.2:80
```

注意：

* 這裡的規則對映了 `0.0.0.0`，意味著將接受主機來自所有介面的流量。使用者可以透過 `-p IP:host_port:container_port` 或 `-p IP::port` 來指定允許訪問容器的主機上的 IP、介面等，以制定更嚴格的規則。

* 如果希望永久繫結到某個固定的 IP 地址，可以在 Docker 設定檔案 `/etc/docker/daemon.json` 中新增如下內容。

```json
{
  "ip": "0.0.0.0"
}
```

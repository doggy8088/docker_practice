# 快速設定指南

下面是一個跟 Docker 網路相關的指令清單。

其中有些指令選項只有在 Docker 服務啟動的時候才能設定，而且不能馬上生效。

* `-b BRIDGE` 或 `--bridge=BRIDGE` 指定容器掛載的網橋
* `--bip=CIDR` 定製 docker0 的掩碼
* `-H SOCKET...` 或 `--host=SOCKET...` Docker 伺服器端接收指令的通道
* `--icc=true|false` 是否支援容器之間進行通訊
* `--ip-forward=true|false` 請看下文容器之間的通訊
* `--iptables=true|false` 是否允許 Docker 新增 iptables 規則
* `--mtu=BYTES` 容器網路中的 MTU

下面2個指令選項既可以在啟動服務時指定，也可以在啟動容器時指定。在 Docker 服務啟動的時候指定則會成為預設值，後面執行 `docker run` 時可以覆蓋設定的預設值。

* `--dns=IP_ADDRESS...` 使用指定的DNS伺服器
* `--dns-search=DOMAIN...` 指定DNS搜尋域

最後這些選項只有在 `docker run` 執行時使用，因為它是針對容器的屬性內容。

* `-h HOSTNAME` 或 `--hostname=HOSTNAME` 設定容器主機名
* `--link=CONTAINER_NAME:ALIAS` 新增到另一個容器的連線
* `--net=bridge|none|container:NAME_or_ID|host` 設定容器的橋接模式
* `-p SPEC` 或 `--publish=SPEC` 對映容器連接埠到宿主主機
* `-P or --publish-all=true|false` 對映容器所有連接埠到宿主主機

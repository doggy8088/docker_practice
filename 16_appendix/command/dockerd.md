## 伺服器端指令（dockerd）

### dockerd 指令選項

* `--api-cors-header=""`：CORS 頭部域，預設不允許 CORS，要允許任意的跨域訪問，可以指定為 "*"；
* `--authorization-plugin=""`：載入認證的外掛；
* `-b=""`：將容器掛載到一個已存在的網橋上。指定為 `none` 時則停用容器的網路，與 `--bip` 選項互斥；
* `--bip=""`：讓動態建立的 `docker0` 網橋採用給定的 CIDR 地址; 與 `-b` 選項互斥；
* `--cgroup-parent=""`：指定 cgroup 的父組，預設 fs cgroup 驅動為 `/docker`，systemd cgroup 驅動為 `system.slice`；
* `--cluster-store=""`：構成叢集（如 `Swarm`）時，叢集鍵值資料庫服務地址；
* `--cluster-advertise=""`：構成叢集時，自身的被訪問地址，可以為 `host:port` 或 `interface:port`；
* `--cluster-store-opt=""`：構成叢集時，鍵值資料庫的設定選項；
* `--config-file="/etc/docker/daemon.json"`：daemon 設定檔案路徑；
* `--containerd=""`：containerd 檔案的路徑；
* `-D, --debug=true|false`：是否使用 Debug 模式。預設為 false；
* `--default-gateway=""`：容器的 IPv4 閘道器地址，必須在網橋的子網段內；
* `--default-gateway-v6=""`：容器的 IPv6 閘道器地址；
* `--default-ulimit=[]`：預設的 ulimit 值；
* `--disable-legacy-registry=true|false`：是否允許訪問舊版本的映象倉庫伺服器；
* `--dns=""`：指定容器使用的 DNS 伺服器地址；
* `--dns-opt=""`：DNS 選項；
* `--dns-search=[]`：DNS 搜尋域；
* `--exec-opt=[]`：執行時的執行選項；
* `--exec-root=""`：容器執行狀態檔案的根路徑，預設為 `/var/run/docker`；
* `--fixed-cidr=""`：限定分配 IPv4 地址範圍；
* `--fixed-cidr-v6=""`：限定分配 IPv6 地址範圍；
* `-G, --group=""`：分配給 unix 套接字的組，預設為 `docker`；
* `-g, --graph=""`：Docker 執行時的根路徑，預設為 `/var/lib/docker`；
* `-H, --host=[]`：指定指令對應 Docker daemon 的監聽介面，可以為 unix 套接字 `unix:///path/to/socket`，檔案句柄 `fd://socketfd` 或 tcp 套接字 `tcp://[host[:port]]`，預設為 `unix:///var/run/docker.sock`；
* `--icc=true|false`：是否啟用容器間以及跟 daemon 所在主機的通訊。預設為 true。
* `--insecure-registry=[]`：允許訪問給定的非安全倉庫服務；
* `--ip=""`：繫結容器連接埠時候的預設 IP 地址。預設為 `0.0.0.0`；
* `--ip-forward=true|false`：是否檢查啟動在 Docker 主機上的啟用 IP 轉發服務，預設開啟。注意關閉該選項將不對系統轉發能力進行任何檢查修改；
* `--ip-masq=true|false`：是否進行地址偽裝，用於容器訪問外部網路，預設開啟；
* `--iptables=true|false`：是否允許 Docker 新增 iptables 規則。預設為 true；
* `--ipv6=true|false`：是否啟用 IPv6 支援，預設關閉；
* `-l, --log-level="debug|info|warn|error|fatal"`：指定日誌輸出級別；
* `--label="[]"`：新增指定的鍵值對標註；
* `--log-driver="json-file|syslog|journald|gelf|fluentd|awslogs|splunk|etwlogs|gcplogs|none"`：指定日誌後端驅動，預設為 `json-file`；
* `--log-opt=[]`：日誌後端的選項；
* `--mtu=VALUE`：指定容器網路的 `mtu`；
* `-p=""`：指定 daemon 的 PID 檔案路徑。預設為 `/var/run/docker.pid`；
* `--raw-logs`：輸出原始，未加色彩的日誌訊息；
* `--registry-mirror=<scheme>://<host>`：指定 `docker pull` 時使用的註冊伺服器映象地址；
* `-s, --storage-driver=""`：指定使用給定的儲存後端；
* `--selinux-enabled=true|false`：是否啟用 SELinux 支援。預設值為 false。SELinux 目前尚不支援 overlay 儲存驅動；
* `--storage-opt=[]`：驅動後端選項；
* `--tls=true|false`：是否對 Docker daemon 啟用 TLS 安全機制，預設為否；
* `--tlscacert=/.docker/ca.pem`：TLS CA 簽名的可信證書檔案路徑；
* `--tlscert=/.docker/cert.pem`：TLS 可信證書檔案路徑；
* `--tlscert=/.docker/key.pem`：TLS 金鑰檔案路徑；
* `--tlsverify=true|false`：啟用 TLS 校驗，預設為否；
* `--userland-proxy=true|false`：是否使用使用者態代理來實現容器間和出容器的回環通訊，預設為 true；
* `--userns-remap=default|uid:gid|user:group|user|uid`：指定容器的使用者命名空間，預設是建立新的 UID 和 GID 對映到容器內程序。

### 參考

* [官方文件](https://docs.docker.com/engine/reference/commandline/dockerd/)

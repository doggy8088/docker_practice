# Compose 樣板檔案

樣板檔案是使用 `Compose` 的核心，涉及到的指令關鍵字也比較多。但大家不用擔心，這裡面大部分指令跟 `docker run` 相關引數的含義都是類似的。

預設的樣板檔案名稱為 `docker-compose.yml`，格式為 YAML 格式。

```yaml


services:
  webapp:
    image: examples/web
    ports:
      - "80:80"
    volumes:
      - "/data"
```

注意每個服務都必須透過 `image` 指令指定映象或 `build` 指令（需要 Dockerfile）等來自動建立生成映象。

如果使用 `build` 指令，在 `Dockerfile` 中設定的選項(例如：`CMD`, `EXPOSE`, `VOLUME`, `ENV` 等) 將會自動被獲取，無需在 `docker-compose.yml` 中重複設定。

下面分別介紹各個指令的用法。

## `build`

指定 `Dockerfile` 所在資料夾的路徑（可以是絕對路徑，或者相對 docker-compose.yml 檔案的路徑）。 `Compose` 將會利用它自動建立這個映象，然後使用這個映象。

```yaml

services:

  webapp:
    build: ./dir
```

你也可以使用 `context` 指令指定 `Dockerfile` 所在資料夾的路徑。

使用 `dockerfile` 指令指定 `Dockerfile` 檔案名。

使用 `arg` 指令指定建立映象時的變數。

```yaml

services:

  webapp:
    build:
      context: ./dir
      dockerfile: Dockerfile-alternate
      args:
        buildno: 1
```

使用 `cache_from` 指定建立映象的快取

```yaml
build:
  context: .
  cache_from:
    - alpine:latest
    - corp/web_app:3.14
```

## `cap_add, cap_drop`

指定容器的核心能力（capacity）分配。

例如，讓容器擁有所有能力可以指定為：

```yaml
cap_add:
  - ALL
```

去掉 NET_ADMIN 能力可以指定為：

```yaml
cap_drop:
  - NET_ADMIN
```

## `command`

覆蓋容器啟動後預設執行的指令。

```yaml
command: echo "hello world"
```

## `configs`

僅用於 `Swarm mode`（已棄用，推薦使用 Kubernetes）。

## `cgroup_parent`

指定父 `cgroup` 組，意味著將繼承該組的資源限制。

例如，建立了一個 cgroup 組名稱為 `cgroups_1`。

```yaml
cgroup_parent: cgroups_1
```

## `container_name`

指定容器名稱。預設將會使用 `專案名稱_服務名稱_序號` 這樣的格式。

```yaml
container_name: docker-web-container
```

>注意: 指定容器名稱後，該服務將無法進行擴充套件（scale），因為 Docker 不允許多個容器具有相同的名稱。

## `deploy`

僅用於 `Swarm mode`（已棄用，推薦使用 Kubernetes）。

## `devices`

指定裝置對映關係。

```yaml
devices:
  - "/dev/ttyUSB1:/dev/ttyUSB0"
```

## `depends_on`

解決容器的依賴、啟動先後的問題。以下例子中會先啟動 `redis` `db` 再啟動 `web`

```yaml


services:
  web:
    build: .
    depends_on:
      - db
      - redis

  redis:
    image: redis

  db:
    image: postgres
```

>注意：`web` 服務不會等待 `redis` `db` 「完全啟動」之後才啟動。

## `dns`

自定義 `DNS` 伺服器。可以是一個值，也可以是一個清單。

```yaml
dns: 8.8.8.8

dns:
  - 8.8.8.8
  - 114.114.114.114
```

## `dns_search`

設定 `DNS` 搜尋域。可以是一個值，也可以是一個清單。

```yaml
dns_search: example.com

dns_search:
  - domain1.example.com
  - domain2.example.com
```

## `tmpfs`

掛載一個 tmpfs 檔案系統到容器。

```yaml
tmpfs: /run
tmpfs:
  - /run
  - /tmp
```

## `env_file`

從檔案中獲取環境變數，可以為單獨的檔案路徑或清單。

如果透過 `docker-compose -f FILE` 方式來指定 Compose 樣板檔案，則 `env_file` 中變量的路徑會基於樣板檔案路徑。

如果有變數名稱與 `environment` 指令衝突，則按照慣例，以後者為準。

```bash
env_file: .env

env_file:
  - ./common.env
  - ./apps/web.env
  - /opt/secrets.env
```

環境變數檔案中每一行必須符合格式，支援 `#` 開頭的註解行。

```bash
# common.env: Set development environment
PROG_ENV=development
```

## `environment`

設定環境變數。你可以使用陣列或字典兩種格式。

只給定名稱的變數會自動獲取執行 Compose 主機上對應變數的值，可以用來防止洩露不必要的資料。

```yaml
environment:
  RACK_ENV: development
  SESSION_SECRET:

environment:
  - RACK_ENV=development
  - SESSION_SECRET
```

如果變數名稱或者值中用到 `true|false，yes|no` 等表達 [布林](https://yaml.org/type/bool.html) 含義的詞彙，最好放到引號裡，避免 YAML 自動解析某些內容為對應的布林語義。這些特定詞彙，包括

```bash
y|Y|yes|Yes|YES|n|N|no|No|NO|true|True|TRUE|false|False|FALSE|on|On|ON|off|Off|OFF
```

## `expose`

暴露連接埠，但不對映到宿主機，只被連線的服務訪問。

僅可以指定內部連接埠為引數

```yaml
expose:
 - "3000"
 - "8000"
```

## `external_links`

>注意：不建議使用該指令。

連結到 `docker-compose.yml` 外部的容器，甚至並非 `Compose` 管理的外部容器。

```yaml
external_links:
 - redis_1
 - project_db_1:mysql
 - project_db_1:postgresql
```

## `extra_hosts`

類似 Docker 中的 `--add-host` 引數，指定額外的 host 名稱對映訊息。

```yaml
extra_hosts:
 - "googledns:8.8.8.8"
 - "dockerhub:52.1.157.61"
```

會在啟動後的服務容器中 `/etc/hosts` 檔案中新增如下兩條條目。

```bash
8.8.8.8 googledns
52.1.157.61 dockerhub
```

## `healthcheck`

透過指令檢查容器是否健康執行。

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost"]
  interval: 1m30s
  timeout: 10s
  retries: 3
```

## `image`

指定為映象名稱或映象 ID。如果映象在本地不存在，`Compose` 將會嘗試拉取這個映象。

```yaml
image: ubuntu
image: orchardup/postgresql
image: a4bc65fd
```

## `labels`

為容器新增 Docker 元資料（metadata）訊息。例如可以為容器新增輔助說明訊息。

```yaml
labels:
  com.startupteam.description: "webapp for a startup team"
  com.startupteam.department: "devops department"
  com.startupteam.release: "rc3 for v1.0"
```

## `links`

>注意：不推薦使用該指令。容器之間應透過 Docker 網路（networks）進行互聯。

## `logging`

設定日誌選項。

```yaml
logging:
  driver: syslog
  options:
    syslog-address: "tcp://192.168.0.42:123"
```

目前支援三種日誌驅動型別。

```yaml
driver: "json-file"
driver: "syslog"
driver: "none"
```

`options` 設定日誌驅動的相關引數。

```yaml
options:
  max-size: "200k"
  max-file: "10"
```

## `network_mode`

設定網路模式。使用和 `docker run` 的 `--network` 引數一樣的值。

```yaml
network_mode: "bridge"
network_mode: "host"
network_mode: "none"
network_mode: "service:[service name]"
network_mode: "container:[container name/id]"
```

## `networks`

設定容器連線的網路。

```yaml

services:

  some-service:
    networks:
     - some-network
     - other-network

networks:
  some-network:
  other-network:
```

## `pid`

跟主機系統共享程序命名空間。開啟該選項的容器之間，以及容器和宿主機系統之間可以透過程序 ID 來相互訪問和操作。

```yaml
pid: "host"
```

## `ports`

暴露連接埠訊息。

使用宿主連接埠：容器連接埠 `(HOST:CONTAINER)` 格式，或者僅僅指定容器的連接埠（宿主將會隨機選擇連接埠）都可以。

```yaml
ports:
 - "3000"
 - "8000:8000"
 - "49100:22"
 - "127.0.0.1:8001:8001"
```

*注意：當使用 `HOST:CONTAINER` 格式來對映連接埠時，如果你使用的容器連接埠小於 60 並且沒放到引號裡，可能會得到錯誤結果，因為 `YAML` 會自動解析 `xx:yy` 這種數字格式為 60 進位。為避免出現這種問題，建議數字串都採用引號包括起來的字串格式。*

## `secrets`

儲存敏感資料，例如 `mysql` 服務密碼。

```yaml

services:

mysql:
  image: mysql
  environment:
    MYSQL_ROOT_PASSWORD_FILE: /run/secrets/db_root_password
  secrets:
    - db_root_password
    - my_other_secret

secrets:
  my_secret:
    file: ./my_secret.txt
  my_other_secret:
    external: true
```

## `security_opt`

指定容器樣板標籤（label）機制的預設屬性（使用者、角色、型別、級別等）。例如設定標籤的使用者名和角色名。

```yaml
security_opt:
    - label:user:USER
    - label:role:ROLE
```

## `stop_signal`

設定另一個訊號來停止容器。在預設情況下使用的是 SIGTERM 停止容器。

```yaml
stop_signal: SIGUSR1
```

## `sysctls`

設定容器核心引數。

```yaml
sysctls:
  net.core.somaxconn: 1024
  net.ipv4.tcp_syncookies: 0

sysctls:
  - net.core.somaxconn=1024
  - net.ipv4.tcp_syncookies=0
```

## `ulimits`

指定容器的 ulimits 限制值。

例如，指定最大程序數為 65535，指定檔案句柄數為 20000（軟限制，應用可以隨時修改，不能超過硬限制） 和 40000（系統硬限制，只能 root 使用者提高）。

```yaml
  ulimits:
    nproc: 65535
    nofile:
      soft: 20000
      hard: 40000
```

## `volumes`

資料卷所掛載路徑設定。可以設定為宿主機路徑(`HOST:CONTAINER`)或者資料卷名稱(`VOLUME:CONTAINER`)，並且可以設定訪問模式 （`HOST:CONTAINER:ro`）。

該指令中路徑支援相對路徑。

```yaml
volumes:
 - /var/lib/mysql
 - cache/:/tmp/cache
 - ~/configs:/etc/configs/:ro
```

如果路徑為數據卷名稱，必須在檔案中設定資料卷。

```yaml


services:
  my_src:
    image: mysql:8.0
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:  
```

## 其它指令

此外，還有包括 `domainname, entrypoint, hostname, ipc, mac_address, privileged, read_only, shm_size, restart, stdin_open, tty, user, working_dir` 等指令，基本跟 `docker run` 中對應引數的功能一致。

指定服務容器啟動後執行的入口檔案。

```yaml
entrypoint: /code/entrypoint.sh
```

指定容器中執行應用的使用者名。

```yaml
user: nginx
```

指定容器中工作目錄。

```yaml
working_dir: /code
```

指定容器中搜索網域名稱、主機名、mac 地址等。

```yaml
domainname: your_website.com
hostname: test
mac_address: 08-00-27-00-0C-0A
```

允許容器中執行一些特權指令。

```yaml
privileged: true
```

指定容器退出後的重啟策略為始終重啟。該指令對保持服務始終執行十分有效，在生產環境中推薦設定為 `always` 或者 `unless-stopped`。

```yaml
restart: always
```

以只讀模式掛載容器的 root 檔案系統，意味著不能對容器內容進行修改。

```yaml
read_only: true
```

開啟標準輸入，可以接受外部輸入。

```yaml
stdin_open: true
```

模擬一個偽終端。

```yaml
tty: true
```

## 讀取變數

Compose 樣板檔案支援動態讀取主機的系統環境變數和當前目錄下的 `.env` 檔案中的變數。

例如，下面的 Compose 檔案將從執行它的環境中讀取變數 `${MONGO_VERSION}` 的值，並寫入執行的指令中。

```yaml

services:

db:
  image: "mongo:${MONGO_VERSION}"
```

如果執行 `MONGO_VERSION=3.2 docker-compose up` 則會啟動一個 `mongo:3.2` 映象的容器；如果執行 `MONGO_VERSION=2.8 docker-compose up` 則會啟動一個 `mongo:2.8` 映象的容器。

若當前目錄存在 `.env` 檔案，執行 `docker-compose` 指令時將從該檔案中讀取變數。

在當前目錄新建 `.env` 檔案並寫入以下內容。

```bash
# 支援 # 號註解
MONGO_VERSION=3.6
```

執行 `docker-compose up` 則會啟動一個 `mongo:3.6` 映象的容器。

## 參考資料

* [官方文件](https://docs.docker.com/compose/compose-file/)
* [awesome-compose](https://github.com/docker/awesome-compose)

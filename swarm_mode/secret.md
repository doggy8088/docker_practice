# 在 Swarm 叢集中管理敏感資料

在動態的、大規模的分散式叢集上，管理和分發 `密碼`、`證書` 等敏感訊息是極其重要的工作。傳統的金鑰分發方式（如金鑰放入映象中，設定環境變數，volume 動態掛載等）都存在著潛在的巨大的安全風險。

Docker 目前已經提供了 `secrets` 管理功能，使用者可以在 Swarm 叢集中安全地管理密碼、金鑰證書等敏感資料，並允許在多個 Docker 容器實例之間共享訪問指定的敏感資料。

>注意： `secret` 也可以在 `Docker Compose` 中使用。

我們可以用 `docker secret` 指令來管理敏感訊息。接下來我們在上面章節中建立好的 Swarm 叢集中介紹該指令的使用。

這裡我們以在 Swarm 叢集中部署 `mysql` 和 `wordpress` 服務為例。

## 建立 secret

我們使用 `docker secret create` 指令以通道符的形式建立 `secret`

```bash
$ openssl rand -base64 20 | docker secret create mysql_password -

$ openssl rand -base64 20 | docker secret create mysql_root_password -
```

## 檢視 secret

使用 `docker secret ls` 指令來檢視 `secret`

```bash
$ docker secret ls

ID                          NAME                  CREATED             UPDATED
l1vinzevzhj4goakjap5ya409   mysql_password        41 seconds ago      41 seconds ago
yvsczlx9votfw3l0nz5rlidig   mysql_root_password   12 seconds ago      12 seconds ago
```

## 建立 MySQL 服務

建立服務相關指令已經在前邊章節進行了介紹，這裡直接列出指令。

```bash
$ docker network create -d overlay mysql_private

$ docker service create \
     --name mysql \
     --replicas 1 \
     --network mysql_private \
     --mount type=volume,source=mydata,destination=/var/lib/mysql \
     --secret source=mysql_root_password,target=mysql_root_password \
     --secret source=mysql_password,target=mysql_password \
     -e MYSQL_ROOT_PASSWORD_FILE="/run/secrets/mysql_root_password" \
     -e MYSQL_PASSWORD_FILE="/run/secrets/mysql_password" \
     -e MYSQL_USER="wordpress" \
     -e MYSQL_DATABASE="wordpress" \
     mysql:latest
```

如果你沒有在 `target` 中顯式的指定路徑時，`secret` 預設透過 `tmpfs` 檔案系統掛載到容器的 `/run/secrets` 目錄中。

```bash
$ docker service create \
     --name wordpress \
     --replicas 1 \
     --network mysql_private \
     --publish target=30000,port=80 \
     --mount type=volume,source=wpdata,destination=/var/www/html \
     --secret source=mysql_password,target=wp_db_password,mode=0444 \
     -e WORDPRESS_DB_USER="wordpress" \
     -e WORDPRESS_DB_PASSWORD_FILE="/run/secrets/wp_db_password" \
     -e WORDPRESS_DB_HOST="mysql:3306" \
     -e WORDPRESS_DB_NAME="wordpress" \
     wordpress:latest
```

檢視服務

```bash
$ docker service ls

ID            NAME   MODE        REPLICAS  IMAGE
wvnh0siktqr3  mysql      replicated  1/1       mysql:latest
nzt5xzae4n62  wordpress  replicated  1/1       wordpress:latest
```

現在瀏覽器訪問 `IP:30000`，即可開始 `WordPress` 的安裝與使用。

透過以上方法，我們沒有像以前透過設定環境變數來設定 MySQL 密碼， 而是採用 `docker secret` 來設定密碼，防範了密碼洩露的風險。

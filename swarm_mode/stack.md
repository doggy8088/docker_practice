# 使用 Compose 檔案

正如之前使用 `compose.yml` 來一次設定、啟動多個容器，在 `Swarm` 叢集中也可以使用 `compose` 檔案 （`compose.yml`） 來設定、啟動多個服務。

上一節中，我們使用 `docker service create` 一次只能部署一個服務，使用 `compose.yml` 我們可以一次啟動多個關聯的服務。

我們以在 `Swarm` 叢集中部署 `WordPress` 為例進行說明。

```yaml
version: "3"

services:
  wordpress:
    image: wordpress
    ports:
      - 80:80
    networks:
      - overlay
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
    deploy:
      mode: replicated
      replicas: 3

  db:
    image: mysql
    networks:
       - overlay
    volumes:
      - db-data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: somewordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
    deploy:
      placement:
        constraints: [node.role == manager]

  visualizer:
    image: dockersamples/visualizer:stable
    ports:
      - "8080:8080"
    stop_grace_period: 1m30s
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
    deploy:
      placement:
        constraints: [node.role == manager]

volumes:
  db-data:
networks:
  overlay:
```

在 `Swarm` 叢集管理節點新建該檔案，其中的 `visualizer` 服務提供一個視覺化頁面，我們可以從瀏覽器中很直觀的檢視叢集中各個服務的執行節點。

在 `Swarm` 叢集中使用 `compose.yml` 我們用 `docker stack` 指令，下面我們對該指令進行詳細講解。

## 部署服務

部署服務使用 `docker stack deploy`，其中 `-c` 引數指定 compose 檔案名。

```bash
$ docker stack deploy -c compose.yml wordpress
```

現在我們開啟瀏覽器輸入 `任一節點IP:8080` 即可看到各節點執行狀態。如下圖所示：

![](../.gitbook/assets/wordpress.png)

在瀏覽器新的標籤頁輸入 `任一節點IP` 即可看到 `WordPress` 安裝介面，安裝完成之後，輸入 `任一節點IP` 即可看到 `WordPress` 頁面。

## 檢視服務

```bash
$ docker stack ls
NAME                SERVICES
wordpress           3
```

## 移除服務

要移除服務，使用 `docker stack down`

```bash
$ docker stack down wordpress
Removing service wordpress_db
Removing service wordpress_visualizer
Removing service wordpress_wordpress
Removing network wordpress_overlay
Removing network wordpress_default
```

該指令不會移除服務所使用的 `資料卷`，如果你想移除資料卷請使用 `docker volume rm`

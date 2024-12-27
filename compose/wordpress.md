# 使用 WordPress

> 本小節內容適合 `PHP` 開發人員閱讀。

`Compose` 可以很便捷的讓 `Wordpress` 執行在一個獨立的環境中。

## 建立空文件夾

假設新建一個名為 `wordpress` 的資料夾，然後進入這個資料夾。

## 建立 `docker-compose.yml` 檔案

[`docker-compose.yml`](https://github.com/yeasy/docker_practice/blob/master/compose/demo/wordpress/docker-compose.yml) 檔案將開啟一個 `wordpress` 服務和一個獨立的 `MySQL` 實例：

```yaml
version: "3"
services:

   db:
     image: mysql:8.0
     command:
      - --default_authentication_plugin=mysql_native_password
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci     
     volumes:
       - db_data:/var/lib/mysql
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress

   wordpress:
     depends_on:
       - db
     image: wordpress:latest
     ports:
       - "8000:80"
     restart: always
     environment:
       WORDPRESS_DB_HOST: db:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress
volumes:
  db_data:
```

## 建立並執行專案

執行 `docker-compose up -d` Compose 就會拉取映象再建立我們所需要的映象，然後啟動 `wordpress` 和數據庫容器。 接著瀏覽器訪問 `127.0.0.1:8000` 連接埠就能看到 `WordPress` 安裝介面了。

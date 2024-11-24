# [WordPress](https://hub.docker.com/_/wordpress/)

## 基本訊息

[WordPress](https://en.wikipedia.org/wiki/WordPress) 是開源的 Blog 和內容管理系統框架，它基於 PHP 和 MySQL。

該倉庫位於 `https://hub.docker.com/_/wordpress/` ，提供了 WordPress 4.x ~ 5.x 版本的映象。

## 使用方法

啟動容器需要 MySQL 的支援，預設連接埠為 `80`。

```bash
$ docker run --name some-wordpress --link some-mysql:mysql -d wordpress
```

啟動 WordPress 容器時可以指定的一些環境變數包括：

* `WORDPRESS_DB_USER` 預設為 `root`
* `WORDPRESS_DB_PASSWORD` 預設為連線 mysql 容器的環境變數 `MYSQL_ROOT_PASSWORD` 的值
* `WORDPRESS_DB_NAME` 預設為 `wordpress`

## Dockerfile

請到 https://github.com/docker-library/docs/tree/master/wordpress 檢視。

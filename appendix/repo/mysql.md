# [MySQL](https://hub.docker.com/_/mysql/)

## 基本訊息

[MySQL](https://en.wikipedia.org/wiki/MySQL) 是開源的關係資料庫實現。

該倉庫位於 `https://hub.docker.com/_/mysql/` ，提供了 MySQL 5.5 ~ 8.x 各個版本的映象。

## 使用方法

預設會在 `3306` 連接埠啟動資料庫。

```bash
$ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=mysecretpassword -d mysql
```

之後就可以使用其它應用來連線到該容器。

```bash
$ docker run --name some-app --link some-mysql:mysql -d application-that-uses-mysql
```

或者透過 `mysql` 指令行連線。

```bash
$ docker run -it --rm \
    --link some-mysql:mysql \
    mysql \
    sh -c 'exec mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -P"$MYSQL_PORT_3306_TCP_PORT" -uroot -p"$MYSQL_ENV_MYSQL_ROOT_PASSWORD"'
```

## Dockerfile

請到 https://github.com/docker-library/docs/tree/master/mysql 檢視

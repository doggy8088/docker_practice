# [MongoDB](https://hub.docker.com/_/mongo/)

## 基本訊息

[MongoDB](https://en.wikipedia.org/wiki/MongoDB) 是開源的 NoSQL 資料庫實現。

該倉庫位於 `https://hub.docker.com/_/mongo/` ，提供了 MongoDB 2.x ~ 4.x 各個版本的映象。

## 使用方法

預設會在 `27017` 連接埠啟動資料庫。

```bash
$ docker run --name mongo -d mongo
```

使用其他應用連線到容器，可以用

```bash
$ docker run --name some-app --link some-mongo:mongo -d application-that-uses-mongo
```

或者透過 `mongo`

```bash
$ docker run -it --rm \
    --link some-mongo:mongo \
    mongo \
    sh -c 'exec mongo "$MONGO_PORT_27017_TCP_ADDR:$MONGO_PORT_27017_TCP_PORT/test"'
```

## Dockerfile

請到 https://github.com/docker-library/docs/tree/master/mongo 檢視。

# [MongoDB](https://hub.docker.com/_/mongo/)

## 基本訊息

[MongoDB](https://en.wikipedia.org/wiki/MongoDB) 是開源的 NoSQL 資料庫實現。

該倉庫位於 `https://hub.docker.com/_/mongo/` ，提供了 MongoDB 2.x ~ 4.x 各個版本的映象。

## 使用方法

預設會在 `27017` 連接埠啟動資料庫。

```bash
$ docker run --name mongo -d mongo
```

使用其他應用連線到容器，首先建立網路
```bash
$ docker network create my-mongo-net
```

然後啟動 MongoDB 容器
```bash
$ docker run --name some-mongo -d --network my-mongo-net mongo
```

最後啟動應用容器
```bash
$ docker run --name some-app -d --network my-mongo-net application-that-uses-mongo
```

或者透過 `mongo`

```bash
$ docker run -it --rm \
    --network my-mongo-net \
    mongo \
    sh -c 'exec mongo "some-mongo:27017/test"'
```
```

## Dockerfile

請到 https://github.com/docker-library/docs/tree/master/mongo 檢視。

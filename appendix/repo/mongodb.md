## [MongoDB]

本節涵蓋了相關內容與詳細描述，主要探討以下幾個方面：

### 基本訊息

[MongoDB](https://en.wikipedia.org/wiki/MongoDB) 是開源的 NoSQL 資料庫實現。

該倉庫位於 `https://hub.docker.com/_/mongo/`。具體可用版本以 Docker Hub 上的 tags 清單為準。

### 使用方法

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

### Dockerfile

請到 https://github.com/docker-library/docs/tree/master/mongo 檢視。

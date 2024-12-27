# [Redis](https://hub.docker.com/_/redis/)

## 基本訊息

[Redis](https://en.wikipedia.org/wiki/Redis) 是開源的記憶體 Key-Value 資料庫實現。

該倉庫位於 `https://hub.docker.com/_/redis/` ，提供了 Redis 3.x ~ 6.x 各個版本的映象。

## 使用方法

預設會在 `6379` 連接埠啟動資料庫。

```bash
$ docker run --name some-redis -d -p 6379:6379 redis
```

另外還可以啟用 [持久儲存](https://redis.io/topics/persistence)。

```bash
$ docker run --name some-redis -d -p 6379:6379 redis redis-server --appendonly yes
```

預設資料儲存位置在 `VOLUME/data`。可以使用 `--volumes-from some-volume-container` 或 `-v /docker/host/dir:/data` 將資料存放到本地。

使用其他應用連線到容器，可以用

```bash
$ docker run --name some-app --link some-redis:redis -d application-that-uses-redis
```

或者透過 `redis-cli`

```bash
$ docker run -it --rm \
    --link some-redis:redis \
    redis \
    sh -c 'exec redis-cli -h "$REDIS_PORT_6379_TCP_ADDR" -p "$REDIS_PORT_6379_TCP_PORT"'
```

## Dockerfile

請到 https://github.com/docker-library/docs/tree/master/redis 檢視。

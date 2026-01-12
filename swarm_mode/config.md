# 在 Swarm 叢集中管理設定資料

在動態的、大規模的分散式叢集上，管理和分發設定檔案也是很重要的工作。傳統的設定檔案分發方式（如設定檔案放入映象中，設定環境變數，volume 動態掛載等）都降低了映象的通用性。

在 Docker 17.06 以上版本中，Docker 新增了 `docker config` 子指令來管理叢集中的設定訊息，以後你無需將設定檔案放入映象或掛載到容器中就可實現對服務的設定。

>注意：`config` 僅能在 Swarm 叢集中使用。

這裡我們以在 Swarm 叢集中部署 `redis` 服務為例。

## 建立 config

新建 `redis.conf` 檔案

```bash
port 6380
```

此項設定 Redis 監聽 `6380` 連接埠

我們使用 `docker config create` 指令建立 `config`

```bash
$ docker config create redis.conf redis.conf
```

## 檢視 config

使用 `docker config ls` 指令來檢視 `config`

```bash
$ docker config ls

ID                          NAME                CREATED             UPDATED
yod8fx8iiqtoo84jgwadp86yk   redis.conf          4 seconds ago       4 seconds ago
```

## 建立 redis 服務

```bash
$ docker service create \
     --name redis \
     # --config source=redis.conf,target=/etc/redis.conf \
     --config redis.conf \
     -p 6379:6380 \
     redis:latest \
     redis-server /redis.conf
```

如果你沒有在 `target` 中顯式的指定路徑時，預設的 `redis.conf` 以 `tmpfs` 檔案系統掛載到容器的 `/config.conf`。

經過測試，redis 可以正常使用。

以前我們透過監聽主機目錄來設定 Redis，就需要在叢集的每個節點放置該檔案，如果採用 `docker config` 來管理服務的設定訊息，我們只需在叢集中的管理節點建立 `config`，當部署服務時，叢集會自動的將設定檔案分發到執行服務的各個節點中，大大降低了設定訊息的管理和分發難度。

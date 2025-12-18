# 資料卷

`資料卷` 是一個可供一個或多個容器使用的特殊目錄，它繞過 UnionFS，可以提供很多有用的屬性：

* `資料卷` 可以在容器之間共享和重用

* 對 `資料卷` 的修改會立馬生效

* 對 `資料卷` 的更新，不會影響映象

* `資料卷` 預設會一直存在，即使容器被刪除

>注意：`資料卷` 的使用，類似於 Linux 下對目錄或檔案進行 mount，映象中的被指定為掛載點的目錄中的檔案會複製到資料卷中（僅資料卷為空時會複製）。

## 建立一個資料卷

```bash
$ docker volume create my-vol
```

檢視所有的 `資料卷`

```bash
$ docker volume ls

DRIVER              VOLUME NAME
local               my-vol
```

在主機裡使用以下指令可以檢視指定 `資料卷` 的訊息

```bash
$ docker volume inspect my-vol
[
    {
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/my-vol/_data",
        "Name": "my-vol",
        "Options": {},
        "Scope": "local"
    }
]
```

## 啟動一個掛載資料卷的容器

在用 `docker run` 指令的時候，使用 `--mount` 標記來將 `資料卷` 掛載到容器裡。在一次 `docker run` 中可以掛載多個 `資料卷`。

下面建立一個名為 `web` 的容器，並載入一個 `資料卷` 到容器的 `/usr/share/nginx/html` 目錄。

```bash
$ docker run -d -P \
    --name web \
    # -v my-vol:/usr/share/nginx/html \
    --mount source=my-vol,target=/usr/share/nginx/html \
    nginx:alpine
```

## 檢視資料卷的具體訊息

在主機裡使用以下指令可以檢視 `web` 容器的訊息

```bash
$ docker inspect web
```

`資料卷` 訊息在 "Mounts" Key 下面

```json
"Mounts": [
    {
        "Type": "volume",
        "Name": "my-vol",
        "Source": "/var/lib/docker/volumes/my-vol/_data",
        "Destination": "/usr/share/nginx/html",
        "Driver": "local",
        "Mode": "",
        "RW": true,
        "Propagation": ""
    }
],
```

## 刪除資料卷

```bash
$ docker volume rm my-vol
```

`資料卷` 是被設計用來持久化資料的，它的生命週期獨立於容器，Docker 不會在容器被刪除後自動刪除 `資料卷`，並且也不存在垃圾回收這樣的機制來處理沒有任何容器引用的 `資料卷`。如果需要在刪除容器的同時移除資料卷。可以在刪除容器的時候使用 `docker rm -v` 這個指令。

無主的資料卷可能會佔據很多空間，要清理請使用以下指令

```bash
$ docker volume prune
```

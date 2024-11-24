# 掛載主機目錄

## 掛載一個主機目錄作為資料卷

使用 `--mount` 標記可以指定掛載一個本地主機的目錄到容器中去。

```bash
$ docker run -d -P \
    --name web \
    # -v /src/webapp:/usr/share/nginx/html \
    --mount type=bind,source=/src/webapp,target=/usr/share/nginx/html \
    nginx:alpine
```

上面的指令載入主機的 `/src/webapp` 目錄到容器的 `/usr/share/nginx/html`目錄。這個功能在進行測試的時候十分方便，比如使用者可以放置一些程式到本地目錄中，來檢視容器是否正常工作。本地目錄的路徑必須是絕對路徑，以前使用 `-v` 引數時如果本地目錄不存在 Docker 會自動為你建立一個資料夾，現在使用 `--mount` 引數時如果本地目錄不存在，Docker 會報錯。

Docker 掛載主機目錄的預設許可權是 `讀寫`，使用者也可以透過增加 `readonly` 指定為 `只讀`。

```bash
$ docker run -d -P \
    --name web \
    # -v /src/webapp:/usr/share/nginx/html:ro \
    --mount type=bind,source=/src/webapp,target=/usr/share/nginx/html,readonly \
    nginx:alpine
```

加了 `readonly` 之後，就掛載為 `只讀` 了。如果你在容器內 `/usr/share/nginx/html` 目錄新建檔案，會顯示如下錯誤

```bash
/usr/share/nginx/html # touch new.txt
touch: new.txt: Read-only file system
```

## 檢視資料卷的具體訊息

在主機裡使用以下指令可以檢視 `web` 容器的訊息

```bash
$ docker inspect web
```

`掛載主機目錄` 的設定訊息在 "Mounts" Key 下面

```json
"Mounts": [
    {
        "Type": "bind",
        "Source": "/src/webapp",
        "Destination": "/usr/share/nginx/html",
        "Mode": "",
        "RW": true,
        "Propagation": "rprivate"
    }
],
```

## 掛載一個本地主機檔案作為資料卷

`--mount` 標記也可以從主機掛載單個檔案到容器中

```bash
$ docker run --rm -it \
   # -v $HOME/.bash_history:/root/.bash_history \
   --mount type=bind,source=$HOME/.bash_history,target=/root/.bash_history \
   ubuntu:18.04 \
   bash

root@2affd44b4667:/# history
1  ls
2  diskutil list
```

這樣就可以記錄在容器輸入過的指令了。

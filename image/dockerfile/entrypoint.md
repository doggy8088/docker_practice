# ENTRYPOINT 入口點

`ENTRYPOINT` 的格式和 `RUN` 指令格式一樣，分為 `exec` 格式和 `shell` 格式。

`ENTRYPOINT` 的目的和 `CMD` 一樣，都是在指定容器啟動程式及引數。`ENTRYPOINT` 在執行時也可以替代，不過比 `CMD` 要略顯繁瑣，需要透過 `docker run` 的引數 `--entrypoint` 來指定。

當指定了 `ENTRYPOINT` 後，`CMD` 的含義就發生了改變，不再是直接的執行其指令，而是將 `CMD` 的內容作為引數傳給 `ENTRYPOINT` 指令，換句話說實際執行時，將變為：

```bash
<ENTRYPOINT> "<CMD>"
```

那麼有了 `CMD` 後，為什麼還要有 `ENTRYPOINT` 呢？這種 `<ENTRYPOINT> "<CMD>"` 有什麼好處麼？讓我們來看幾個場景。

#### 場景一：讓映象變成像指令一樣使用

假設我們需要一個得知自己當前公網 IP 的映象，那麼可以先用 `CMD` 來實現：

```docker
FROM ubuntu:24.04
RUN apt-get update \
    && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*
CMD [ "curl", "-s", "http://myip.ipip.net" ]
```

假如我們使用 `docker build -t myip .` 來建立映象的話，如果我們需要查詢當前公網 IP，只需要執行：

```bash
$ docker run myip
當前 IP：61.148.226.66 來自：北京市 聯通
```

嗯，這麼看起來好像可以直接把映象當做指令使用了，不過指令總有引數，如果我們希望加引數呢？比如從上面的 `CMD` 中可以看到實質的指令是 `curl`，那麼如果我們希望顯示 HTTP 頭訊息，就需要加上 `-i` 引數。那麼我們可以直接加 `-i` 引數給 `docker run myip` 麼？

```bash
$ docker run myip -i
docker: Error response from daemon: invalid header field value "oci runtime error: container_linux.go:247: starting container process caused \"exec: \\\"-i\\\": executable file not found in $PATH\"\n".
```

我們可以看到可執行檔案找不到的報錯，`executable file not found`。之前我們說過，跟在映象名後面的是 `command`，執行時會替換 `CMD` 的預設值。因此這裡的 `-i` 替換了原來的 `CMD`，而不是新增在原來的 `curl -s http://myip.ipip.net` 後面。而 `-i` 根本不是指令，所以自然找不到。

那麼如果我們希望加入 `-i` 這引數，我們就必須重新完整的輸入這個指令：

```bash
$ docker run myip curl -s http://myip.ipip.net -i
```

這顯然不是很好的解決方案，而使用 `ENTRYPOINT` 就可以解決這個問題。現在我們重新用 `ENTRYPOINT` 來實現這個映象：

```docker
FROM ubuntu:24.04
RUN apt-get update \
    && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*
ENTRYPOINT [ "curl", "-s", "http://myip.ipip.net" ]
```

這次我們再來嘗試直接使用 `docker run myip -i`：

```bash
$ docker run myip
當前 IP：61.148.226.66 來自：北京市 聯通

$ docker run myip -i
HTTP/1.1 200 OK
Server: nginx/1.8.0
Date: Tue, 22 Nov 2016 05:12:40 GMT
Content-Type: text/html; charset=UTF-8
Vary: Accept-Encoding
X-Powered-By: PHP/5.6.24-1~dotdeb+7.1
X-Cache: MISS from cache-2
X-Cache-Lookup: MISS from cache-2:80
X-Cache: MISS from proxy-2_6
Transfer-Encoding: chunked
Via: 1.1 cache-2:80, 1.1 proxy-2_6:8006
Connection: keep-alive

當前 IP：61.148.226.66 來自：北京市 聯通
```

可以看到，這次成功了。這是因為當存在 `ENTRYPOINT` 後，`CMD` 的內容將會作為引數傳給 `ENTRYPOINT`，而這裡 `-i` 就是新的 `CMD`，因此會作為引數傳給 `curl`，從而達到了我們預期的效果。

#### 場景二：應用執行前的準備工作

啟動容器就是啟動主程序，但有些時候，啟動主程序前，需要一些準備工作。

比如 `mysql` 類別的資料庫，可能需要一些資料庫設定、初始化的工作，這些工作要在最終的 mysql 伺服器執行之前解決。

此外，可能希望避免使用 `root` 使用者去啟動服務，從而提高安全性，而在啟動服務前還需要以 `root` 身份執行一些必要的準備工作，最後切換到服務使用者身份啟動服務。或者除了服務外，其它指令依舊可以使用 `root` 身份執行，方便除錯等。

這些準備工作是和容器 `CMD` 無關的，無論 `CMD` 為什麼，都需要事先進行一個預處理的工作。這種情況下，可以寫一個指令碼，然後放入 `ENTRYPOINT` 中去執行，而這個指令碼會將接到的引數（也就是 `<CMD>`）作為指令，在指令碼最後執行。比如官方映象 `redis` 中就是這麼做的：

```docker
FROM alpine:3.4
...
RUN addgroup -S redis && adduser -S -G redis redis
...
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 6379
CMD [ "redis-server" ]
```

可以看到其中為了 redis 服務建立了 redis 使用者，並在最後指定了 `ENTRYPOINT` 為 `docker-entrypoint.sh` 指令碼。

```bash
#!/bin/sh
...
# allow the container to be started with `--user`
if [ "$1" = 'redis-server' -a "$(id -u)" = '0' ]; then
	find . \! -user redis -exec chown redis '{}' +
	exec gosu redis "$0" "$@"
fi

exec "$@"
```

該指令碼的內容就是根據 `CMD` 的內容來判斷，如果是 `redis-server` 的話，則切換到 `redis` 使用者身份啟動伺服器，否則依舊使用 `root` 身份執行。比如：

```bash
$ docker run -it redis id
uid=0(root) gid=0(root) groups=0(root)
```

## [Nginx](https://hub.docker.com/_/nginx/)

### 基本訊息

[Nginx](https://en.wikipedia.org/wiki/Nginx) 是開源的高效的 Web 伺服器實現，支援 HTTP、HTTPS、SMTP、POP3、IMAP 等協定。

該倉庫位於 `https://hub.docker.com/_/nginx/` ，提供了 Nginx 1.0 ~ 1.19.x 各個版本的映象。

### 使用方法

下面的指令將作為一個靜態頁面伺服器啟動。

```bash
$ docker run --name some-nginx -v /some/content:/usr/share/nginx/html:ro -d nginx
```

使用者也可以不使用這種對映方式，透過利用 Dockerfile 來直接將靜態頁面內容放到映象中，內容為

```docker
FROM nginx
COPY static-html-directory /usr/share/nginx/html
```

之後生成新的映象，並啟動一個容器。

```bash
$ docker build -t some-content-nginx .
$ docker run --name some-nginx -d some-content-nginx
```

開放連接埠，並對映到本地的 `8080` 連接埠。

```bash
$ docker run --name some-nginx -d -p 8080:80 some-content-nginx
```

Nginx的預設設定檔案路徑為 `/etc/nginx/nginx.conf`，可以透過對映它來使用本地的設定檔案，例如

```bash
$ docker run -d \
    --name some-nginx \
    -p 8080:80 \
    -v /path/nginx.conf:/etc/nginx/nginx.conf:ro \
    nginx
```

### Dockerfile

請到 https://github.com/docker-library/docs/tree/master/nginx 檢視。

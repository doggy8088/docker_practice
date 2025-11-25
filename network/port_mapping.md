# 外部訪問容器

容器中可以執行一些網路應用，要讓外部也可以訪問這些應用，可以透過 `-P` 或 `-p` 引數來指定連接埠對映。

當使用 `-P` 標記時，Docker 會隨機對映一個連接埠到內部容器開放的網路連接埠。

使用 `docker container ls` 可以看到，本地主機的 32768 被對映到了容器的 80 連接埠。此時訪問本機的 32768 連接埠即可訪問容器內 NGINX 預設頁面。

```bash
$ docker run -d -P nginx:alpine

$ docker container ls -l
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                   NAMES
fae320d08268        nginx:alpine        "/docker-entrypoint.…"   24 seconds ago      Up 20 seconds       0.0.0.0:32768->80/tcp   bold_mcnulty
```

同樣的，可以透過 `docker logs` 指令來檢視訪問記錄。

```bash
$ docker logs fa
172.17.0.1 - - [25/Aug/2020:08:34:04 +0000] "GET / HTTP/1.1" 200 612 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:80.0) Gecko/20100101 Firefox/80.0" "-"
```

`-p` 則可以指定要對映的連接埠，並且，在一個指定連接埠上只可以繫結一個容器。支援的格式有 `ip:hostPort:containerPort | ip::containerPort | hostPort:containerPort`。

## 對映所有介面地址

使用 `hostPort:containerPort` 格式本地的 80 連接埠對映到容器的 80 連接埠，可以執行

```bash
$ docker run -d -p 80:80 nginx:alpine
```

此時預設會繫結本地所有介面上的所有地址。

## 對映到指定地址的指定連接埠

可以使用 `ip:hostPort:containerPort` 格式指定對映使用一個特定地址，比如 localhost 地址 127.0.0.1

```bash
$ docker run -d -p 127.0.0.1:80:80 nginx:alpine
```

## 對映到指定地址的任意連接埠

使用 `ip::containerPort` 繫結 localhost 的任意連接埠到容器的 80 連接埠，本地主機會自動分配一個連接埠。

```bash
$ docker run -d -p 127.0.0.1::80 nginx:alpine
```

還可以使用 `udp` 標記來指定 `udp` 連接埠

```bash
$ docker run -d -p 127.0.0.1:80:80/udp nginx:alpine
```

## 檢視對映連接埠設定

使用 `docker port` 來檢視當前對映的連接埠設定，也可以檢視到繫結的地址

```bash
$ docker port fa 80
0.0.0.0:32768
```

注意：
* 容器有自己的內部網路和 ip 地址（使用 `docker inspect` 檢視，Docker 還可以有一個可變的網路設定。）

* `-p` 標記可以多次使用來繫結多個連接埠

例如

```bash
$ docker run -d \
    -p 80:80 \
    -p 443:443 \
    nginx:alpine
```

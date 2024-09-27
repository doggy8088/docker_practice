# 部署服務

我們使用 `docker service` 指令來管理 `Swarm` 叢集中的服務，該指令只能在管理節點執行。

## 新建服務

現在我們在上一節建立的 `Swarm` 叢集中執行一個名為 `nginx` 服務。

```bash
$ docker service create --replicas 3 -p 80:80 --name nginx nginx:1.13.7-alpine
```

現在我們使用瀏覽器，輸入任意節點 IP ，即可看到 nginx 預設頁面。

## 檢視服務

使用 `docker service ls` 來檢視當前 `Swarm` 叢集執行的服務。

```bash
$ docker service ls
ID                  NAME                MODE                REPLICAS            IMAGE                 PORTS
kc57xffvhul5        nginx               replicated          3/3                 nginx:1.13.7-alpine   *:80->80/tcp
```

使用 `docker service ps` 來檢視某個服務的詳情。

```bash
$ docker service ps nginx
ID                  NAME                IMAGE                 NODE                DESIRED STATE       CURRENT STATE                ERROR               PORTS
pjfzd39buzlt        nginx.1             nginx:1.13.7-alpine   swarm2              Running             Running about a minute ago
hy9eeivdxlaa        nginx.2             nginx:1.13.7-alpine   swarm1              Running             Running about a minute ago
36wmpiv7gmfo        nginx.3             nginx:1.13.7-alpine   swarm3              Running             Running about a minute ago
```

使用 `docker service logs` 來檢視某個服務的日誌。

```bash
$ docker service logs nginx
nginx.3.36wmpiv7gmfo@swarm3    | 10.255.0.4 - - [25/Nov/2017:02:10:30 +0000] "GET / HTTP/1.1" 200 612 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:58.0) Gecko/20100101 Firefox/58.0" "-"
nginx.3.36wmpiv7gmfo@swarm3    | 10.255.0.4 - - [25/Nov/2017:02:10:30 +0000] "GET /favicon.ico HTTP/1.1" 404 169 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:58.0) Gecko/20100101 Firefox/58.0" "-"
nginx.3.36wmpiv7gmfo@swarm3    | 2017/11/25 02:10:30 [error] 5#5: *1 open() "/usr/share/nginx/html/favicon.ico" failed (2: No such file or directory), client: 10.255.0.4, server: localhost, request: "GET /favicon.ico HTTP/1.1", host: "192.168.99.102"
nginx.1.pjfzd39buzlt@swarm2    | 10.255.0.2 - - [25/Nov/2017:02:10:26 +0000] "GET / HTTP/1.1" 200 612 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:58.0) Gecko/20100101 Firefox/58.0" "-"
nginx.1.pjfzd39buzlt@swarm2    | 10.255.0.2 - - [25/Nov/2017:02:10:27 +0000] "GET /favicon.ico HTTP/1.1" 404 169 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:58.0) Gecko/20100101 Firefox/58.0" "-"
nginx.1.pjfzd39buzlt@swarm2    | 2017/11/25 02:10:27 [error] 5#5: *1 open() "/usr/share/nginx/html/favicon.ico" failed (2: No such file or directory), client: 10.255.0.2, server: localhost, request: "GET /favicon.ico HTTP/1.1", host: "192.168.99.101"
```

## 服務伸縮

我們可以使用 `docker service scale` 對一個服務執行的容器數量進行伸縮。

當業務處於高峰期時，我們需要擴充套件服務執行的容器數量。

```bash
$ docker service scale nginx=5
```

當業務平穩時，我們需要減少服務執行的容器數量。

```bash
$ docker service scale nginx=2
```

## 刪除服務

使用 `docker service rm` 來從 `Swarm` 叢集移除某個服務。

```bash
$ docker service rm nginx
```

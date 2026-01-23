# HEALTHCHECK 健康檢查

格式：

* `HEALTHCHECK [選項] CMD <指令>`：設定檢查容器健康狀況的指令
* `HEALTHCHECK NONE`：如果基礎映象有健康檢查指令，使用這行可以遮蔽掉其健康檢查指令

`HEALTHCHECK` 指令是告訴 Docker 應該如何進行判斷容器的狀態是否正常，這是 Docker 1.12 引入的新指令。

在沒有 `HEALTHCHECK` 指令前，Docker 引擎只可以透過容器內主程序是否退出來判斷容器是否狀態異常。很多情況下這沒問題，但是如果程式進入死鎖狀態，或者死迴圈狀態，應用程序並不退出，但是該容器已經無法提供服務了。在 1.12 以前，Docker 不會檢測到容器的這種狀態，從而不會重新排程，導致可能會有部分容器已經無法提供服務了卻還在接受使用者請求。

而自 1.12 之後，Docker 提供了 `HEALTHCHECK` 指令，透過該指令指定一行指令，用這行指令來判斷容器主程序的服務狀態是否還正常，從而比較真實的反應容器實際狀態。

當在一個映象指定了 `HEALTHCHECK` 指令後，用其啟動容器，初始狀態會為 `starting`，在 `HEALTHCHECK` 指令檢查成功後變為 `healthy`，如果連續一定次數失敗，則會變為 `unhealthy`。

`HEALTHCHECK` 支援下列選項：

* `--interval=<間隔>`：兩次健康檢查的間隔，預設為 30 秒；
* `--timeout=<時長>`：健康檢查指令執行超時時間，如果超過這個時間，本次健康檢查就被視為失敗，預設 30 秒；
* `--retries=<次數>`：當連續失敗指定次數後，則將容器狀態視為 `unhealthy`，預設 3 次。

和 `CMD`, `ENTRYPOINT` 一樣，`HEALTHCHECK` 只可以出現一次，如果寫了多個，只有最後一個生效。

在 `HEALTHCHECK [選項] CMD` 後面的指令，格式和 `ENTRYPOINT` 一樣，分為 `shell` 格式，和 `exec` 格式。指令的回傳值決定了該次健康檢查的成功與否：`0`：成功；`1`：失敗；`2`：保留，不要使用這個值。

假設我們有個映象是個最簡單的 Web 服務，我們希望增加健康檢查來判斷其 Web 服務是否在正常工作，我們可以用 `curl` 來幫助判斷，其 `Dockerfile` 的 `HEALTHCHECK` 可以這麼寫：

```docker
FROM nginx
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
HEALTHCHECK --interval=5s --timeout=3s \
  CMD curl -fs http://localhost/ || exit 1
```

這裡我們設定了每 5 秒檢查一次（這裡為了試驗所以間隔非常短，實際應該相對較長），如果健康檢查指令超過 3 秒沒回應就視為失敗，並且使用 `curl -fs http://localhost/ || exit 1` 作為健康檢查指令。

使用 `docker build` 來建立這個映象：

```bash
$ docker build -t myweb:v1 .
```

建立好了後，我們啟動一個容器：

```bash
$ docker run -d --name web -p 80:80 myweb:v1
```

當執行該映象後，可以透過 `docker container ls` 看到最初的狀態為 `(health: starting)`：

```bash
$ docker container ls
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                            PORTS               NAMES
03e28eb00bd0        myweb:v1            "nginx -g 'daemon off"   3 seconds ago       Up 2 seconds (health: starting)   80/tcp, 443/tcp     web
```

在等待幾秒鐘後，再次 `docker container ls`，就會看到健康狀態變化為了 `(healthy)`：

```bash
$ docker container ls
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                    PORTS               NAMES
03e28eb00bd0        myweb:v1            "nginx -g 'daemon off"   18 seconds ago      Up 16 seconds (healthy)   80/tcp, 443/tcp     web
```

如果健康檢查連續失敗超過了重試次數，狀態就會變為 `(unhealthy)`。

為了幫助排障，健康檢查指令的輸出（包括 `stdout` 以及 `stderr`）都會被儲存於健康狀態裡，可以用 `docker inspect` 來檢視。

```bash
$ docker inspect --format '{{json .State.Health}}' web | python -m json.tool
{
    "FailingStreak": 0,
    "Log": [
        {
            "End": "2016-11-25T14:35:37.940957051Z",
            "ExitCode": 0,
            "Output": "<!DOCTYPE html>\n<html>\n<head>\n<title>Welcome to nginx!</title>\n<style>\n    body {\n        width: 35em;\n        margin: 0 auto;\n        font-family: Tahoma, Verdana, Arial, sans-serif;\n    }\n</style>\n</head>\n<body>\n<h1>Welcome to nginx!</h1>\n<p>If you see this page, the nginx web server is successfully installed and\nworking. Further configuration is required.</p>\n\n<p>For online documentation and support please refer to\n<a href=\"http://nginx.org/\">nginx.org</a>.<br/>\nCommercial support is available at\n<a href=\"http://nginx.com/\">nginx.com</a>.</p>\n\n<p><em>Thank you for using nginx.</em></p>\n</body>\n</html>\n",
            "Start": "2016-11-25T14:35:37.780192565Z"
        }
    ],
    "Status": "healthy"
}
```

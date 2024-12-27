# 設定 HTTP/HTTPS 網路代理

使用Docker的過程中，因為網路原因，通常需要使用 HTTP/HTTPS 代理來加速映象拉取、建立和使用。下面是常見的三種場景。

## 為 dockerd 設定網路代理

"docker pull" 指令是由 dockerd 守護程序執行。而 dockerd 守護程序是由 systemd 管理。因此，如果需要在執行 "docker pull" 指令時使用 HTTP/HTTPS 代理，需要透過 systemd 設定。

- 為 dockerd 建立設定檔案夾。
```
sudo mkdir -p /etc/systemd/system/docker.service.d
```

- 為 dockerd 建立 HTTP/HTTPS 網路代理的設定檔案，檔案路徑是 /etc/systemd/system/docker.service.d/http-proxy.conf 。並在該檔案中新增相關環境變數。
```
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:8080/"
Environment="HTTPS_PROXY=http://proxy.example.com:8080/"
Environment="NO_PROXY=localhost,127.0.0.1,.example.com"
```

- 重新整理設定並重啟 docker 服務。
```
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 為 docker 容器設定網路代理

在容器執行階段，如果需要使用 HTTP/HTTPS 代理，可以透過更改 docker 用戶端設定，或者指定環境變數的方式。

- 更改 docker 用戶端設定：建立或更改 ~/.docker/config.json，並在該檔案中新增相關設定。
```
{
 "proxies":
 {
   "default":
   {
     "httpProxy": "http://proxy.example.com:8080/",
     "httpsProxy": "http://proxy.example.com:8080/",
     "noProxy": "localhost,127.0.0.1,.example.com"
   }
 }
}
```

- 指定環境變數：執行 "docker run" 指令時，指定相關環境變數。

| 環境變數 |  docker run 範例 |
| -------- | ---------------- |
| HTTP_PROXY | --env HTTP_PROXY="http://proxy.example.com:8080/" |
| HTTPS_PROXY | --env HTTPS_PROXY="http://proxy.example.com:8080/" |
| NO_PROXY | --env NO_PROXY="localhost,127.0.0.1,.example.com" |

## 為 docker build 過程設定網路代理

在容器建立階段，如果需要使用 HTTP/HTTPS 代理，可以透過指定 "docker build" 的環境變數，或者在 Dockerfile 中指定環境變數的方式。

- 使用 "--build-arg" 指定 "docker build" 的相關環境變數
```
docker build \
    --build-arg "HTTP_PROXY=http://proxy.example.com:8080/" \
    --build-arg "HTTPS_PROXY=http://proxy.example.com:8080/" \
    --build-arg "NO_PROXY=localhost,127.0.0.1,.example.com" .
```

- 在 Dockerfile 中指定相關環境變數

| 環境變數 | Dockerfile 範例 |
| -------- | ---------------- |
| HTTP_PROXY | ENV HTTP_PROXY="http://proxy.example.com:8080/" |
| HTTPS_PROXY | ENV HTTPS_PROXY="http://proxy.example.com:8080/" |
| NO_PROXY | ENV NO_PROXY="localhost,127.0.0.1,.example.com" |


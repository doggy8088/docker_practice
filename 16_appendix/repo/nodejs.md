## [Node.js](https://hub.docker.com/_/node/)

### 基本訊息

[Node.js](https://en.wikipedia.org/wiki/Node.js) 是基於 JavaScript 的可擴充套件伺服器端和網路軟體開發平台。

該倉庫位於 `https://hub.docker.com/_/node/` ，提供了 Node.js 0.10 ~ 14.x 各個版本的映象。

### 使用方法

在專案中建立一個 Dockerfile。

```docker
FROM node:12
## replace this with your application's default port

EXPOSE 8888
```

然後建立映象，並啟動容器。

```bash
$ docker build -t my-nodejs-app
$ docker run -it --rm --name my-running-app my-nodejs-app
```

也可以直接執行一個簡單容器。

```bash
$ docker run -it --rm \
    --name my-running-script \
    # -v "$(pwd)":/usr/src/myapp \
    --mount type=bind,src=`$(pwd)`,target=/usr/src/myapp \
    -w /usr/src/myapp \
    node:12-alpine \
    node your-daemon-or-script.js
```

### Dockerfile

請到 https://github.com/docker-library/docs/tree/master/node 檢視。

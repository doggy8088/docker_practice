# 使用 `BuildKit` 建立映象

**BuildKit** 是下一代的映象建立元件，在 https://github.com/moby/buildkit 開源。

**注意：如果您的映象建立使用的是雲服務商提供的映象建立服務（騰訊雲容器服務、阿里雲容器服務等），由於上述服務提供商的 Docker 版本低於 18.09，BuildKit 無法使用，將造成映象建立失敗。建議使用 BuildKit 建立映象時使用一個新的 Dockerfile 檔案（例如 Dockerfile.buildkit）**

目前，Docker Hub 自動建立已經支援 buildkit，具體請參考 https://github.com/docker-practice/docker-hub-buildx

## `Dockerfile` 新增指令詳解

啟用 `BuildKit` 之後，我們可以使用下面幾個新的 `Dockerfile` 指令來加快映象建立。

### `RUN --mount=type=cache`

目前，幾乎所有的程式都會使用依賴管理工具，例如 `Go` 中的 `go mod`、`Node.js` 中的 `npm` 等等，當我們建立一個映象時，往往會重複的從網際網路中獲取依賴套件，難以快取，大大降低了映象的建立效率。

例如一個前端工程需要用到 `npm`：

```docker
FROM node:alpine as builder

WORKDIR /app

COPY package.json /app/

RUN npm i --registry=https://registry.npm.taobao.org \
        && rm -rf ~/.npm

COPY src /app/src

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /app/dist
```

使用多階段建立，建立的映象中只包含了目標檔案夾 `dist`，但仍然存在一些問題，當 `package.json` 檔案變動時，`RUN npm i && rm -rf ~/.npm` 這一層會重新執行，變更多次後，生成了大量的中間層映象。

為解決這個問題，進一步的我們可以設想一個類似 **資料卷** 的功能，在映象建立時把 `node_modules` 資料夾掛載上去，在建立完成後，這個 `node_modules` 資料夾會自動解除安裝，實際的映象中並不包含 `node_modules` 這個資料夾，這樣我們就省去了每次獲取依賴的時間，大大增加了映象建立效率，同時也避免了生成了大量的中間層映象。

`BuildKit` 提供了 `RUN --mount=type=cache` 指令，可以實現上邊的設想。

```docker
# syntax = docker/dockerfile:experimental
FROM node:alpine as builder

WORKDIR /app

COPY package.json /app/

RUN --mount=type=cache,target=/app/node_modules,id=my_app_npm_module,sharing=locked \
    --mount=type=cache,target=/root/.npm,id=npm_cache \
        npm i --registry=https://registry.npm.taobao.org

COPY src /app/src

RUN --mount=type=cache,target=/app/node_modules,id=my_app_npm_module,sharing=locked \
# --mount=type=cache,target=/app/dist,id=my_app_dist,sharing=locked \
        npm run build

FROM nginx:alpine

# COPY --from=builder /app/dist /app/dist

# 為了更直觀的說明 from 和 source 指令，這裡使用 RUN 指令
RUN --mount=type=cache,target=/tmp/dist,from=builder,source=/app/dist \
    # --mount=type=cache,target/tmp/dist,from=my_app_dist,sharing=locked \
    mkdir -p /app/dist && cp -r /tmp/dist/* /app/dist
```

**由於 `BuildKit` 為實驗屬性，每個 `Dockerfile` 檔案開頭都必須加上如下指令**

```docker
# syntax = docker/dockerfile:experimental
```

第一個 `RUN` 指令執行後，`id` 為 `my_app_npm_module` 的快取資料夾掛載到了 `/app/node_modules` 資料夾中。多次執行也不會產生多個中間層映象。

第二個 `RUN` 指令執行時需要用到 `node_modules` 資料夾，`node_modules` 已經掛載，指令也可以正確執行。

第三個 `RUN` 指令將上一階段產生的檔案複製到指定位置，`from` 指明快取的來源，這裡 `builder` 表示快取來源於建立的第一階段，`source` 指明快取來源的資料夾。

上面的 `Dockerfile` 中 `--mount=type=cache,...` 中指令作用如下：

|Option               |Description|
|---------------------|-----------|
|`id`                 | `id` 設定一個標誌，以便區分快取。|
|`target` (必填項)     | 快取的掛載目標檔案夾。|
|`ro`,`readonly`      | 只讀，快取資料夾不能被寫入。 |
|`sharing`            | 有 `shared` `private` `locked` 值可供選擇。`sharing` 設定當一個快取被多次使用時的表現，由於 `BuildKit` 支援並行建立，當多個步驟使用同一快取時（同一 `id`）會發生衝突。`shared` 表示多個步驟可以同時讀寫，`private` 表示當多個步驟使用同一快取時，每個步驟使用不同的快取，`locked` 表示當一個步驟完成釋放快取後，後一個步驟才能繼續使用該快取。|
|`from`               | 快取來源（建立階段），不填寫時為空資料夾。|
|`source`             | 來源的資料夾路徑。|

### `RUN --mount=type=bind`

該指令可以將一個映象（或上一建立階段）的檔案掛載到指定位置。

```docker
# syntax = docker/dockerfile:experimental
RUN --mount=type=bind,from=php:alpine,source=/usr/local/bin/docker-php-entrypoint,target=/docker-php-entrypoint \
        cat /docker-php-entrypoint
```

### `RUN --mount=type=tmpfs`

該指令可以將一個 `tmpfs` 檔案系統掛載到指定位置。

```docker
# syntax = docker/dockerfile:experimental
RUN --mount=type=tmpfs,target=/temp \
        mount | grep /temp
```

### `RUN --mount=type=secret`

該指令可以將一個檔案(例如金鑰)掛載到指定位置。

```docker
# syntax = docker/dockerfile:experimental
RUN --mount=type=secret,id=aws,target=/root/.aws/credentials \
        cat /root/.aws/credentials
```

```bash
$ docker build -t test --secret id=aws,src=$HOME/.aws/credentials .
```

### `RUN --mount=type=ssh`

該指令可以掛載 `ssh` 金鑰。

```docker
# syntax = docker/dockerfile:experimental
FROM alpine
RUN apk add --no-cache openssh-client
RUN mkdir -p -m 0700 ~/.ssh && ssh-keyscan gitlab.com >> ~/.ssh/known_hosts
RUN --mount=type=ssh ssh git@gitlab.com | tee /hello
```

```bash
$ eval $(ssh-agent)
$ ssh-add ~/.ssh/id_rsa
(Input your passphrase here)
$ docker build -t test --ssh default=$SSH_AUTH_SOCK .
```

## docker-compose build 使用 Buildkit

設定 `COMPOSE_DOCKER_CLI_BUILD=1` 環境變數即可使用。

## 官方文件

* https://github.com/moby/buildkit/blob/master/frontend/dockerfile/docs/experimental.md

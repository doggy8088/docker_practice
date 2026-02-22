## 部署 Drone

本節涵蓋了相關內容與詳細描述，主要探討以下幾個方面：

### 要求

* 擁有公網 IP、網域名稱 (如果你不滿足要求，可以嘗試在本地使用 Gogs + Drone)

* 網域名稱 SSL 證書 (目前國內有很多雲服務商提供免費證書)

* 熟悉 `Docker` 以及 `Docker Compose`

* 熟悉 `Git` 基本指令

* 對 `CI/CD` 有一定瞭解

### 新建 GitHub 應用

登入 GitHub，在 https://github.com/settings/applications/new 新建一個應用。

![圖](https://docs.drone.io/screenshots/github_application_create.png)

接下來檢視這個應用的詳情，記錄 `Client ID` 和 `Client Secret`，之後設定 Drone 會用到。

### 設定 Drone

我們透過使用 `Docker Compose` 來啟動 `Drone`，編寫 `compose.yaml` (或 `docker-compose.yml`) 檔案。

```yaml
services:

  drone-server:
    image: drone/drone:2.3.1
    ports:
      - 443:443
      - 80:80
    volumes:
      - drone-data:/data:rw
      - ./ssl:/etc/certs
    restart: always
    environment:
      - DRONE_SERVER_HOST=${DRONE_SERVER_HOST:-https://drone.yeasy.com}
      - DRONE_SERVER_PROTO=${DRONE_SERVER_PROTO:-https}
      - DRONE_RPC_SECRET=${DRONE_RPC_SECRET:-secret}
      - DRONE_GITHUB_SERVER=https://github.com
      - DRONE_GITHUB_CLIENT_ID=${DRONE_GITHUB_CLIENT_ID}
      - DRONE_GITHUB_CLIENT_SECRET=${DRONE_GITHUB_CLIENT_SECRET}

  drone-agent:
    image: drone/drone-runner-docker:1
    restart: always
    depends_on:
      - drone-server
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:rw
    environment:
      - DRONE_RPC_PROTO=http
      - DRONE_RPC_HOST=drone-server
      - DRONE_RPC_SECRET=${DRONE_RPC_SECRET:-secret}
      - DRONE_RUNNER_NAME=${HOSTNAME:-demo}
      - DRONE_RUNNER_CAPACITY=2
    dns: 114.114.114.114

volumes:
  drone-data:
```

新建 `.env` 檔案，輸入變數及其值

```bash
## 必填 伺服器地址，例如 drone.domain.com

DRONE_SERVER_HOST=
DRONE_SERVER_PROTO=https
DRONE_RPC_SECRET=secret
HOSTNAME=demo
## 必填 在 GitHub 應用頁面檢視

DRONE_GITHUB_CLIENT_ID=
## 必填 在 GitHub 應用頁面檢視

DRONE_GITHUB_CLIENT_SECRET=
```

#### 概述

總體概述了以下內容。

#### 啟動 Drone

執行以下指令：

```bash
$ docker compose up -d
```

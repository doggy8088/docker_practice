# Swarm mode

Docker 1.12 [Swarm mode](https://docs.docker.com/engine/swarm/) 已經內嵌入 Docker 引擎，成為了 docker 子指令 `docker swarm`。請注意與舊的 `Docker Swarm` 區分開來。

`Swarm mode` 內建 kv 儲存功能，提供了眾多的新屬性，比如：具有容錯能力的去中心化設計、內建服務發現、負載均衡、路由網格、動態伸縮、捲動更新、安全傳輸等。使得 Docker 原生的 `Swarm` 叢集具備與 Mesos、Kubernetes 競爭的實力。

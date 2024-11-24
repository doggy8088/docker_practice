# 基本概念

`Swarm` 是使用 [`SwarmKit`](https://github.com/docker/swarmkit/) 建立的 Docker 引擎內建（原生）的叢集管理和編排工具。

 使用 `Swarm` 叢集之前需要瞭解以下幾個概念。

## 節點

執行 Docker 的主機可以主動初始化一個 `Swarm` 叢集或者加入一個已存在的 `Swarm` 叢集，這樣這個執行 Docker 的主機就成為一個 `Swarm` 叢集的節點 (`node`) 。

節點分為管理 (`manager`) 節點和工作 (`worker`) 節點。

管理節點用於 `Swarm` 叢集的管理，`docker swarm` 指令基本只能在管理節點執行（節點退出叢集指令 `docker swarm leave` 可以在工作節點執行）。一個 `Swarm` 叢集可以有多個管理節點，但只有一個管理節點可以成為 `leader`，`leader` 透過 `raft` 協定實現。

工作節點是任務執行節點，管理節點將服務 (`service`) 下發至工作節點執行。管理節點預設也作為工作節點。你也可以透過設定讓服務只執行在管理節點。

來自 Docker 官網的這張圖片形象的展示了叢集中管理節點與工作節點的關係。

![](https://docs.docker.com/engine/swarm/images/swarm-diagram.png)

## 服務和任務

任務 （`Task`）是 `Swarm` 中的最小的排程單位，目前來說就是一個單一的容器。

服務 （`Services`） 是指一組任務的集合，服務定義了任務的屬性。服務有兩種模式：

* `replicated services` 按照一定規則在各個工作節點上執行指定個數的任務。

* `global services` 每個工作節點上執行一個任務

兩種模式透過 `docker service create` 的 `--mode` 引數指定。

來自 Docker 官網的這張圖片形象的展示了容器、任務、服務的關係。

![](https://docs.docker.com/engine/swarm/images/services-diagram.png)

# 建立 Swarm 叢集

閱讀 [基本概念](overview.md) 一節我們知道 `Swarm` 叢集由 **管理節點** 和 **工作節點** 組成。本節我們來建立一個包含一個管理節點和兩個工作節點的最小 `Swarm` 叢集。

## 初始化叢集

在已經安裝好 Docker 的主機上執行如下指令：

```bash
$ docker swarm init --advertise-addr 192.168.99.100
Swarm initialized: current node (dxn1zf6l61qsb1josjja83ngz) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join \
    --token SWMTKN-1-49nj1cmql0jkz5s954yi3oex3nedyz0fb0xx14ie39trti4wxv-8vxv8rssmk743ojnwacrr2e7c \
    192.168.99.100:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

如果你的 Docker 主機有多個網絡卡，擁有多個 IP，必須使用 `--advertise-addr` 指定 IP。

> 執行 `docker swarm init` 指令的節點自動成為管理節點。

## 增加工作節點

上一步我們初始化了一個 `Swarm` 叢集，擁有了一個管理節點，下面我們繼續在兩個 Docker 主機中分別執行如下指令，建立工作節點並加入到叢集中。

```bash
$ docker swarm join \
    --token SWMTKN-1-49nj1cmql0jkz5s954yi3oex3nedyz0fb0xx14ie39trti4wxv-8vxv8rssmk743ojnwacrr2e7c \
    192.168.99.100:2377

This node joined a swarm as a worker.
```

## 檢視叢集

經過上邊的兩步，我們已經擁有了一個最小的 `Swarm` 叢集，包含一個管理節點和兩個工作節點。

在管理節點使用 `docker node ls` 檢視叢集。

```bash
$ docker node ls
ID                           HOSTNAME  STATUS  AVAILABILITY  MANAGER STATUS
03g1y59jwfg7cf99w4lt0f662    worker2   Ready   Active
9j68exjopxe7wfl6yuxml7a7j    worker1   Ready   Active
dxn1zf6l61qsb1josjja83ngz *  manager   Ready   Active        Leader
```

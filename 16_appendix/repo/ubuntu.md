## [Ubuntu](https://hub.docker.com/_/ubuntu/)

### 基本訊息

[Ubuntu](https://en.wikipedia.org/wiki/Ubuntu) 是流行的 Linux 發行版，其自帶軟體版本往往較新一些。

該倉庫位於 `https://hub.docker.com/_/ubuntu/` ，提供了 Ubuntu 從 12.04 ~ 20.04 各個版本的映象。

### 使用方法

預設會啟動一個最小化的 Ubuntu 環境。

```bash
$ docker run --name some-ubuntu -it ubuntu:20.04
root@523c70904d54:/#
```

### Dockerfile

請到 https://github.com/docker-library/docs/tree/master/ubuntu 檢視。

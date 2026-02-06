# podman

[`podman`](https://github.com/containers/podman) 是一個無守護程序、與 Docker 指令高度相容的下一代 Linux 容器工具。它由 Red Hat 開發，旨在提供一個更安全的容器執行環境。

## Podman vs Docker

| 屬性 | Docker | Podman |
| :--- | :--- | :--- |
| **架構** | C/S 架構，依賴守護程序 (`dockerd`) | 無守護程序 (Daemonless) |
| **許可權** | 預設需要 root 許可權 (雖有 Rootless 模式) | 預設支援 Rootless (非 root 使用者執行) |
| **生態** | 完整的生態系統 (Compose, Swarm) | 專注單機容器，配合 Kubernetes 使用 |
| **映象建立** | `docker build` | `podman build` 或 `buildah` |

## 安裝

### CentOS / RHEL

```bash
$ sudo yum -y install podman
```

### macOS

macOS 上需要安裝 Podman Desktop 或透過 Homebrew 安裝：

```bash
$ brew install podman
$ podman machine init
$ podman machine start
```

## 使用

`podman` 的指令行幾乎與 `docker` 完全相容，大多數情況下，你只需將 `docker` 替換為 `podman` 即可。

### 執行容器

```bash
# $ docker run -d -p 80:80 nginx:alpine

$ podman run -d -p 80:80 nginx:alpine
```

### 列出容器

```bash
$ podman ps
```

### 建立映象

```bash
$ podman build -t myimage .
```

## Pods 的概念

與 Docker 不同，Podman 支援 "Pod" 的概念（類似於 Kubernetes 的 Pod），允許你在同一個網路命名空間中執行多個容器。

```bash
# 建立一個 Pod
$ podman pod create --name mypod -p 8080:80

# 在 Pod 中執行容器
$ podman run -d --pod mypod --name webbing nginx
```

## 遷移到 Podman

如果你習慣使用 `docker` 指令，可以簡單地設定別名：

$ alias docker=podman
```

## 進階用法

### Systemd 整合

Podman 可以生成 systemd 單元檔案，讓容器像普通系統服務一樣管理。

```bash
# 建立容器
$ podman run -d --name myweb -p 8080:80 nginx

# 生成 systemd 檔案
$ podman generate systemd --name myweb --files --new

# 啟用並啟動服務
$ systemctl --user enable --now container-myweb.service
```

### Podman Compose

雖然 Podman 相容 Docker Compose，但在某些場景下你可能需要明確使用 `podman-compose`。

```bash
$ pip3 install podman-compose
$ podman-compose up -d
```

## 參考

* [Podman 官方網站](https://podman.io/)
* [Podman GitHub 倉庫](https://github.com/containers/podman)

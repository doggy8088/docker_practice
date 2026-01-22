# 基本架構

Docker 採用了 `C/S`（用戶端/伺服器端）架構，包括用戶端和伺服器端。Docker 守護程序（`Daemon`）作為伺服器端接受來自用戶端的請求，並處理這些請求（建立、執行、分發容器）。

用戶端和伺服器端既可以執行在一個機器上，也可透過 `socket` 或者 `RESTful API` 來進行通訊。

![Docker 基本架構](../.gitbook/assets/docker_arch.png)

## 核心元件

Docker 的核心元件形成了一個層次化的架構：

```
┌─────────────────────────────────────────────────┐
│                  Docker CLI                      │
│              (docker 指令行工具)                  │
├─────────────────────────────────────────────────┤
│                   dockerd                        │
│            (Docker 守護程序/引擎)                 │
├─────────────────────────────────────────────────┤
│                  containerd                      │
│          (容器生命週期管理器)                     │
├─────────────────────────────────────────────────┤
│                    runc                          │
│           (OCI 容器執行時)                        │
└─────────────────────────────────────────────────┘
```

* **Docker CLI**：使用者與 Docker 互動的指令行工具
* **dockerd**：Docker 守護程序，提供 Docker API，管理映象、網路、儲存等
* **containerd**：高階容器執行時，管理容器的完整生命週期
* **runc**：低階容器執行時，根據 OCI 規範建立和執行容器

## Docker Desktop 架構

在 macOS 和 Windows 上，Docker Desktop 使用輕量級虛擬機執行 Linux 核心：

* **macOS**：使用 Apple Hypervisor Framework 或 QEMU
* **Windows**：使用 WSL 2（推薦）或 Hyper-V

這意味著容器實際執行在虛擬機內的 Linux 環境中，而非直接執行在宿主系統上。

## Docker Engine v29 重要變化

自 Docker Engine v29 起，**Containerd 映象儲存**成為新安裝的預設設定。這一變化：

* 簡化了 Docker 的內部架構
* 提升了與 Kubernetes 等 containerd 平台的互操作性
* 為 Lazy Pulling 等新屬性奠定基礎

Docker 守護程序一般在宿主主機後台執行，等待接收來自用戶端的訊息。Docker 用戶端則為使用者提供一系列可執行指令，使用者用這些指令實現跟 Docker 守護程序互動。

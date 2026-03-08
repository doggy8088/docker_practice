## 本章小結

Docker 並非容器生態的唯一選擇，瞭解其他工具有助於根據場景做出合適的技術選型。

| 專案 | 定位 | 特點 |
|------|------|------|
| **Fedora CoreOS** | 容器化作業系統 | 自動更新、不可變基礎設施、專為執行容器設計 |
| **Podman** | 容器管理引擎 | 無守護程序、相容 Docker CLI、支援 Rootless 模式、支援原生 Pod |
| **Buildah** | 映象建立工具 | Daemonless 工作模式、靈活的指令碼化建立能力 |
| **Skopeo** | 映象倉庫管理 | 無需拉取即可檢查遠端映象、跨倉庫/格式無縫遷移映象 |
| **containerd** | 核心底層執行時 | 穩定高效、符合 CRI 規範、是 Docker 的基石之一 |
| **安全容器** | 強隔離沙箱執行 | 利用輕量級虛擬機 (Kata) 或使用者態核心 (gVisor) 防止越獄，極其安全 |
| **Wasm** | 新型工作負載 | 體積極小、冷啟動超快且具備跨平臺及高度特徵化沙盒能力的後端架構新方向 |

### Podman vs Docker

兩者的主要區別：

| 對比項 | Docker | Podman |
|--------|--------|--------|
| **守護程序** | 需要 dockerd | 無需守護程序 |
| **許可權** | 預設需要 root | 原生支援 Rootless |
| **CLI 相容** | - | 與 Docker 指令相容 |
| **Pod 支援** | 不支援 | 原生支援 Pod 概念 |
| **Compose** | docker compose | podman-compose 或相容模式 |

### 延伸閱讀

- [底層實現](../12_implementation/README.md)：容器技術的核心基礎
- [安全](../18_security/README.md)：容器安全實踐

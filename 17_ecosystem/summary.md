## 本章小結

Docker 並非容器生態的唯一選擇，瞭解其他工具有助於根據場景做出合適的技術選型。

| 專案 | 定位 | 特點 |
|------|------|------|
| **Fedora CoreOS** | 容器化作業系統 | 自動更新、不可變基礎設施、專為執行容器設計 |
| **Podman** | 容器引擎 | 無守護程序、相容 Docker CLI、支援 Rootless 模式 |

### 17.4.1 Podman vs Docker

兩者的主要區別：

| 對比項 | Docker | Podman |
|--------|--------|--------|
| **守護程序** | 需要 dockerd | 無需守護程序 |
| **許可權** | 預設需要 root | 原生支援 Rootless |
| **CLI 相容** | - | 與 Docker 指令相容 |
| **Pod 支援** | 不支援 | 原生支援 Pod 概念 |
| **Compose** | docker compose | podman-compose 或相容模式 |

### 17.4.2 延伸閱讀

- [底層實現](../12_implementation/README.md)：容器技術的核心基礎
- [安全](../18_security/README.md)：容器安全實踐

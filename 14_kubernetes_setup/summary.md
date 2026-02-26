## 14.9 本章小結

部署 Kubernetes 叢集有多種方式，應根據使用場景選擇合適的方案。

| 部署方式 | 適用場景 | 特點 |
|---------|---------|------|
| **kubeadm** | 生產環境 | 官方推薦的叢集部署工具 |
| **Docker Desktop** | 本地開發 | 一鍵啟用，開箱即用 |
| **Kind** | CI/CD 測試 | Kubernetes IN Docker，快速建立叢集 |
| **K3s** | 邊緣計算/IoT | 輕量級，資源佔用少 |
| **手動部署** | 學習原理 | 逐步設定每個元件，加深理解 |

### 14.9.1 延伸閱讀

- [容器編排基礎](../13_kubernetes_concepts/README.md)：Kubernetes 核心概念
- [Dashboard](14.7_dashboard.md)：部署視覺化管理介面
- [kubectl](14.8_kubectl.md)：指令行工具使用指南

## 本章小結

etcd 是 Kubernetes 的核心儲存元件，為分散式系統提供可靠的鍵值儲存和服務發現能力。

| 概念 | 要點 |
|------|------|
| **定位** | 分散式鍵值儲存系統，用於設定管理和服務發現 |
| **協定** | 基於 Raft 一致性演算法，保證資料強一致 |
| **API** | 提供 gRPC 和 HTTP API |
| **叢集** | 建議使用奇數節點 (3 或 5 個) 部署 |
| **etcdctl** | 指令行管理工具，支援 put/get/del/watch 等操作 |
| **安全** | 支援 TLS 加密通訊和 RBAC 訪問控制 |

### 15.5.1 延伸閱讀

- [容器編排基礎](../13_kubernetes_concepts/README.md)：Kubernetes 如何使用 etcd
- [部署 Kubernetes](../14_kubernetes_setup/README.md)：在叢集中部署 etcd

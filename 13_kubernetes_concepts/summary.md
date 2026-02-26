## 13.6 本章小結

Kubernetes 是當前最主流的容器編排平台，其宣告式管理模型和豐富的 API 為大規模容器化應用提供了堅實的基礎。

| 概念 | 要點 |
|------|------|
| **Pod** | 最小排程單位，包含一組共享網路和儲存的容器 |
| **Deployment** | 管理 Pod 副本集，支援捲動更新和回滾 |
| **Service** | 為 Pod 提供穩定的網路訪問入口和負載均衡 |
| **Namespace** | 資源隔離和多租戶支援 |
| **ConfigMap/Secret** | 設定與敏感訊息的管理 |
| **Master 節點** | 執行 API Server、Scheduler、Controller Manager |
| **Worker 節點** | 執行 kubelet、kube-proxy 和容器執行時 |

### 13.6.1 延伸閱讀

- [部署 Kubernetes](../14_kubernetes_setup/README.md)：搭建 Kubernetes 叢集
- [Etcd](../15_etcd/README.md)：Kubernetes 使用的分散式儲存
- [底層實現](../12_implementation/README.md)：容器技術原理

## 本章小結

Kubernetes 是當前最主流的容器編排平台，其宣告式管理模型和豐富的 API 為大規模容器化應用提供了堅實的基礎。

| 概念 | 要點 |
|------|------|
| **Pod** | 最小排程單位，包含一組共享網路和儲存的容器 |
| **Deployment** | 管理無狀態應用的 Pod 副本集，支援捲動更新和回滾 |
| **StatefulSet** | 管理有狀態應用，提供穩定的網路標識和持久化儲存 |
| **DaemonSet** | 確保每個節點執行一個 Pod 副本，適用於日誌、監控等場景 |
| **Job/CronJob** | 執行一次性或定時任務，確保任務成功完成 |
| **Service** | 為 Pod 提供穩定的網路訪問入口和負載均衡 |
| **Namespace** | 資源隔離和多租戶支援 |
| **ConfigMap/Secret** | 設定與敏感訊息的管理 |
| **Master 節點** | 執行 API Server、Scheduler、Controller Manager |
| **Worker 節點** | 執行 kubelet、kube-proxy 和容器執行時 |

### 延伸閱讀

- [部署 Kubernetes](../14_kubernetes_setup/README.md)：搭建 Kubernetes 叢集
- [Etcd](../15_etcd/README.md)：Kubernetes 使用的分散式儲存
- [底層實現](../12_implementation/README.md)：容器技術原理
---

> 📝 **發現錯誤或有改進建議？** 歡迎送出 [Issue](https://github.com/yeasy/docker_practice/issues) 或 [PR](https://github.com/yeasy/docker_practice/pulls)。

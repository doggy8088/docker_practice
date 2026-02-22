## Kubernetes 簡介

如圖 12-1 所示，Kubernetes 使用舵手圖示作為專案標識。

![Kubernetes 標識](./_images/kubernetes_logo.png)

圖 12-1 Kubernetes 專案標識

### 什麼是 Kubernetes

Kubernetes (常簡稱為 K8s) 是 Google 開源的容器編排引擎。如果說 Docker 解決了 『如何打包和運送集裝箱』 的問題，那麼 Kubernetes 解決的就是 『如何管理海量集裝箱的排程、執行和維護』 的問題。

它不僅僅是一個編排系統，更是一個 **雲原生應用作業系統**。

> **名字由來**：Kubernetes 在希臘語中意為 『舵手』 或 『飛行員』。K8s 是因為 k 和 s 之間有 8 個字母。

---

### 為什麼需要 Kubernetes

當我們在單機執行幾個容器時，Docker Compose 就足夠了。但在生產環境中，我們需要面對：

- **多主機排程**：容器應該執行在哪台機器上？
- **自動恢復**：容器崩潰了怎麼辦？節點掛了怎麼辦？
- **服務發現**：容器 IP 變了，其他服務怎麼找到它？
- **負載均衡**：流量大了，如何分發給多個副本？
- **捲動更新**：如何不中斷服務升級應用？

Kubernetes 完美解決了這些問題。

---

### 核心概念

本節涵蓋了相關內容與詳細描述，主要探討以下幾個方面：

#### Pod (豆莢)

Kubernetes 的最小排程單位。一個 Pod 可以包含一個或多個緊密協作的容器 (共享網路和儲存)。就像豌豆莢裡的豌豆一樣。

#### Node (節點)

執行 Pod 的物理機或虛擬機。

#### Deployment (部署)

定義應用的期望狀態 (如：需要 3 個副本，映象版本為 v1)。K8s 會持續確保當前狀態符合期望狀態。

#### Service (服務)

定義一組 Pod 的訪問策略。提供穩定的 Cluster IP 和 DNS 名稱，負責負載均衡。

#### Namespace (命名空間)

用於多租戶資源隔離。

---

### Docker 使用者如何轉場

如果你已經熟悉 Docker，學習 K8s 會很容易：

| Docker 概念 | Kubernetes 概念 | 說明 |
|------------|----------------|------|
| Container  | Pod            | K8s 增加了一層 Pod 包裝 |
| Volume     | PersistentVolume | K8s 的儲存更加抽象和強大 |
| Network    | Service/Ingress| K8s 的網路模型更扁平 |
| Compose    | Deployment + Service | 宣告式設定的理念是一致的 |

---

### 架構

Kubernetes 也是 C/S 架構，由 **Control Plane (控制平面)** 和 **Worker Node (工作節點)** 組成：

- **Control Plane**：負責決策 (API Server，Scheduler，Controller Manager，etcd)
- **Worker Node**：負責幹活 (Kubelet，Kube-proxy，Container Runtime)

---

### 學習建議

Kubernetes 的學習曲線較陡峭。建議的學習路徑：

1. **理解基本概念**：Pod，Deployment，Service
2. **動手實踐**：使用 Minikube 或 Kind 在本地搭建叢集
3. **部署應用**：編寫 YAML 部署一個無狀態應用
4. **深入原理**：網路模型、儲存機制、排程演算法

---

### 延伸閱讀

- [Minikube 安裝](../setup/README.md)：本地體驗 K8s
- [Kubernetes 官網](https://kubernetes.io/)：官方文件

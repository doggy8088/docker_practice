# 簡介

隨著容器技術的普及，目前主流的雲端運算服務商都提供了成熟的容器服務。與容器相關的雲端運算服務主要分為以下幾種型別：

## 1. 容器編排託管服務 (Managed K8s)

這是目前最主流的形式。雲廠商託管 Kubernetes 的控制平面（Master節點），使用者只需管理工作節點（Worker Node）。
* **優勢**：降低了 Kubernetes 叢集的維護成本，高可用性由廠商保證。
* **典型服務**：AWS EKS, Azure AKS, Google GKE, 阿里雲 ACK, 騰訊雲 TKE。

## 2. 容器實例服務 (Serverless Containers)

這一類服務通常被稱為 CaaS (Container as a Service)。使用者無需管理底層服務器（EC2/CVM），只需提供映象和設定即可執行容器。
* **優勢**：極致的彈性，按秒計費，零運維。
* **典型服務**：AWS Fargate, Azure Container Instances, Google Cloud Run, 阿里雲 ECI。

## 3. 映象倉庫服務 (Container Registry)

提供安全、可靠的私有 Docker 映象儲存服務，通常與雲廠商的 CI/CD 流水線深度整合。
* **典型服務**：AWS ECR, Azure ACR, Google GCR/GAR, 阿里雲 ACR。

本章將介紹如何在幾個主流雲平台上使用 Docker 和 Kubernetes 服務。

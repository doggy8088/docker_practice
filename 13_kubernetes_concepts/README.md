# 第十三章 容器編排基礎

`Kubernetes` 是 Google 發起的開源容器編排系統，它支援多種雲平台與私有資料中心。

`Kubernetes` 負責對容器工作負載進行排程與編排，其目的是讓使用者透過叢集宣告式地管理應用，而無需手動干預每個容器的生命週期細節。

Kubernetes 的最小排程單位是 `Pod`。一個 `Pod` 由一組緊密協作的容器構成，它們共享網路命名空間、IP 以及部分儲存資源，也可以根據需要對 Pod 進行連接埠對映。

如果你已經熟悉 Docker，可以用以下對照來理解 Kubernetes 的核心概念：Docker 中的『容器』對應 Kubernetes 的 `Pod`（一個或多個容器的組合）；`docker-compose.yml` 的角色類似於 Kubernetes 的 `Deployment` + `Service` 宣告；`docker run` 的連接埠對映和網路設定，在 Kubernetes 中由 `Service` 和 `Ingress` 接管。掌握這些對映關係，有助於從單機 Docker 平滑轉場到叢集編排。

本章將分為 5 節介紹 `Kubernetes`：

* [簡介](13.1_intro.md)
* [基本概念](13.2_concepts.md)
* [架構設計](13.3_design.md)
* [高階屬性](13.4_advanced.md)
* [實戰練習](13.5_practice.md)

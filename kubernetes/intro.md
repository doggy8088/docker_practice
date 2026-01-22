# 簡介

![](../.gitbook/assets/kubernetes_logo.png)

Kubernetes 是 Google 團隊發起的開源專案，它的目標是管理跨多個主機的容器，提供基本的部署，維護以及應用伸縮，主要實現語言為 Go 語言。Kubernetes 是：

* 易學：輕量級，簡單，容易理解
* 便攜：支援公有雲，私有雲，混合雲，以及多種雲平台
* 可拓展：模組化，可插拔，支援鉤子，可任意組合
* 自修復：自動重排程，自動重啟，自動複製

Kubernetes 建立於 Google 數十年經驗，一大半來源於 Google 生產環境規模的經驗。結合了社群最佳的想法和實踐。

在分散式系統中，部署，排程，伸縮一直是最為重要的也最為基礎的功能。Kubernetes 就是希望解決這一序列問題的。

Kubernetes 目前在[GitHub](https://github.com/kubernetes/kubernetes)進行維護。

### Kubernetes 能夠執行在任何地方！

雖然 Kubernetes 最初是為 GCE 定製的，但是在後續版本中陸續增加了其他雲平台的支援，以及本地資料中心的支援。

# 第十四章 部署 Kubernetes

目前，Kubernetes 支援在多種環境下使用，包括本地主機 (Ubuntu、Debian、CentOS、Fedora 等)、雲服務 ([騰訊雲](https://cloud.tencent.com/act/cps/redirect?redirect=10058&cps_key=3a5255852d5db99dcd5da4c72f05df61)、[阿里雲](https://www.aliyun.com/product/kubernetes?source=5176.11533457&userCode=8lx5zmtu&type=copy)、[百度雲](https://cloud.baidu.com/product/cce.html)等)。

你可以使用以下幾種方式部署 Kubernetes，接下來的小節會對各種方式進行詳細介紹。

* [使用 kubeadm 部署 (CRI 使用 containerd)](14.1_kubeadm.md)
* [使用 kubeadm 部署 (使用 Docker)](14.2_kubeadm-docker.md)
* [在 Docker Desktop 使用](14.3_docker-desktop.md)
* [Kind - Kubernetes IN Docker](14.4_kind.md)
* [K3s - 輕量級 Kubernetes](14.5_k3s.md)
* [一步步部署 Kubernetes 叢集](14.6_systemd.md)
* [部署 Dashboard](14.7_dashboard.md)
* [Kubernetes 指令行 kubectl](14.8_kubectl.md)

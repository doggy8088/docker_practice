# 第十四章 部署 Kubernetes

目前，Kubernetes 支援在多種環境下使用，包括本地主機 (Ubuntu、Debian、CentOS、Fedora 等)、雲服務 ([騰訊雲 TKE](https://cloud.tencent.com/product/tke)、[阿里雲 ACK](https://cn.aliyun.com/product/ack)、[百度雲](https://cloud.baidu.com/product/cce.html)等)。

你可以使用以下幾種方式部署 Kubernetes，接下來的小節會對各種方式進行詳細介紹。

* [使用 kubeadm 部署 (CRI 使用 containerd)](14.1_kubeadm.md)
  * Kubernetes 也支援 CRI-O 等符合 CRI 的執行時；本文以 containerd 為主線。
* [使用 kubeadm 部署 (使用 Docker)](14.2_kubeadm-docker.md)
* [在 Docker Desktop 使用](14.3_docker-desktop.md)
* [Kind - Kubernetes IN Docker](14.4_kind.md)
* [K3s - 輕量級 Kubernetes](14.5_k3s.md)
* [一步步部署 Kubernetes 叢集](14.6_systemd.md)
* [視覺化管理介面：Headlamp 與歷史 Dashboard](14.7_dashboard.md)
* [Kubernetes 指令行 kubectl](14.8_kubectl.md)

除了上述方式，企業生產環境中還有兩個常見的部署工具值得關注：

* **[KubeKey](https://github.com/kubesphere/kubekey)**：KubeSphere 社群開源的叢集部署工具（CNCF 認證），支援一條指令從裸機部署到高可用叢集，內建對 containerd 和多 Linux 發行版的適配，適合需要快速搭建私有化 Kubernetes 的團隊。
* **[RKE2](https://docs.rke2.io/)**：SUSE Rancher 出品的安全加固型 Kubernetes 發行版，預設啟用 CIS 基準合規、SELinux 支援和 etcd 自動快照，適合對安全審計有嚴格要求的企業場景。

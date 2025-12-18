# 什麼是 Docker

**Docker** 最初是 `dotCloud` 公司創始人 [Solomon Hykes](https://github.com/shykes) 在法國期間發起的一個公司內部專案，它是基於 `dotCloud` 公司多年雲服務技術的一次革新，並於 [2013 年 3 月以 Apache 2.0 授權協定開源](https://en.wikipedia.org/wiki/Docker_\(software\))，主要專案程式碼在 [GitHub](https://github.com/moby/moby) 上進行維護。`Docker` 專案後來還加入了 Linux 基金會，併成立推動 [開放容器聯盟（OCI）](https://opencontainers.org/)。

**Docker** 自開源後受到廣泛的關注和討論，至今其 [GitHub 專案](https://github.com/moby/moby) 已經超過 5 萬 7 千個星標和一萬多個 `fork`。甚至由於 `Docker` 專案的火爆，在 `2013` 年底，[dotCloud 公司決定改名為 Docker](https://www.docker.com/blog/dotcloud-is-becoming-docker-inc/)。`Docker` 最初是在 `Ubuntu 12.04` 上開發實現的；`Red Hat` 則從 `RHEL 6.5` 開始對 `Docker` 進行支援；`Google` 也在其 `PaaS` 產品中廣泛應用 `Docker`。

**Docker** 使用 `Google` 公司推出的 [Go 語言](https://golang.google.cn/) 進行開發實現，基於 `Linux` 核心的 [cgroup](https://zh.wikipedia.org/wiki/Cgroups)，[namespace](https://en.wikipedia.org/wiki/Linux_namespaces)，以及 [OverlayFS](https://docs.docker.com/storage/storagedriver/overlayfs-driver/) 類別的 [Union FS](https://en.wikipedia.org/wiki/Union_mount) 等技術，對程序進行封裝隔離，屬於 [作業系統層面的虛擬化技術](https://en.wikipedia.org/wiki/Operating-system-level_virtualization)。由於隔離的程序獨立於宿主和其它的隔離的程序，因此也稱其為容器。最初實現是基於 [LXC](https://linuxcontainers.org/lxc/introduction/)，從 `0.7` 版本以後開始去除 `LXC`，轉而使用自行開發的 [libcontainer](https://github.com/docker/libcontainer)，從 `1.11` 版本開始，則進一步演進為使用 [runC](https://github.com/opencontainers/runc) 和 [containerd](https://github.com/containerd/containerd)。

![Docker 架構](https://docs.microsoft.com/en-us/virtualization/windowscontainers/deploy-containers/media/docker-on-linux.png)

> `runc` 是一個 Linux 指令行工具，用於根據 [OCI容器執行時規範](https://github.com/opencontainers/runtime-spec) 建立和執行容器。

> `containerd` 是一個守護程式，它管理容器生命週期，提供了在一個節點上執行容器和管理映象的最小功能集。

**Docker** 在容器的基礎上，進行了進一步的封裝，從檔案系統、網路互聯到程序隔離等等，極大的簡化了容器的建立和維護。使得 `Docker` 技術比虛擬機技術更為輕便、快捷。

下面的圖片比較了 **Docker** 和傳統虛擬化方式的不同之處。傳統虛擬機技術是虛擬出一套硬體後，在其上執行一個完整作業系統，在該系統上再執行所需應用程序；而容器內的應用程序直接執行於宿主的核心，容器內沒有自己的核心，而且也沒有進行硬體虛擬。因此容器要比傳統虛擬機更為輕便。

![傳統虛擬化](../.gitbook/assets/virtualization.png)

![Docker](../.gitbook/assets/docker.png)

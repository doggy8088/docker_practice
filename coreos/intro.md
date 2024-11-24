# Fedora CoreOS 介紹

[Fedora CoreOS](https://getfedora.org/coreos/) 是一個自動更新的，最小的，整體的，以容器為中心的作業系統，不僅適用於叢集，而且可獨立執行，並針對執行 Kubernetes 進行了最佳化。它旨在結合 CoreOS Container Linux 和 Fedora Atomic Host 的優點，將 Container Linux 中的 [Ignition](https://github.com/coreos/ignition) 與 [rpm-ostree](https://github.com/coreos/rpm-ostree) 和 Project Atomic 中的 SELinux 強化等技術相整合。其目標是提供最佳的容器主機，以安全，大規模地執行容器化的工作負載。

## FCOS 屬性

### 一個最小化作業系統

FCOS 被設計成一個基於容器的最小化的現代作業系統。它比現有的 Linux 安裝平均節省 40% 的 RAM（大約 114M ）並允許從 PXE 或 iPXE 非常快速的啟動。

### 系統初始化

Ignition 是一種設定實用程式，可讀取設定檔案（JSON 格式）並根據該設定設定 FCOS 系統。可設定的元件包括儲存，檔案系統，systemd 和使用者。

Ignition 在系統首次啟動期間（在 initramfs 中）僅執行一次。由於 Ignition 在啟動過程中的早期執行，因此它可以在使用者空間開始啟動之前重新對磁碟分割槽，格式化檔案系統，建立使用者並寫入檔案。當 systemd 啟動時，systemd 服務已被寫入磁碟，從而加快了啟動時間。

### 自動更新

FCOS 使用 rpm-ostree 系統進行事務性升級。無需像 yum 升級那樣升級單個軟體套件，而是 rpm-ostree 將 OS 升級作為一個原子單元進行。新的 OS 部署在升級期間進行，並在下次重新引導時生效。如果升級出現問題，則一次回滾和重新啟動會使系統回傳到先前的狀態。確保了系統升級對群集容量的影響降到最小。

### 容器工具

對於諸如建立，複製和其他管理容器的任務，FCOS 用一組容器工具代替了 **Docker CLI**。**podman CLI** 工具支援許多容器執行時功能，例如執行，啟動，停止，列出和刪除容器和映象。**skopeo CLI** 工具可以複製，認證和簽名映象。您還可以使用 **crictl CLI** 工具來處理 CRI-O 容器引擎中的容器和映象。

## 參考文件

* [官方文件](https://docs.fedoraproject.org/en-US/fedora-coreos/)
* [openshift 官方文件](https://docs.openshift.com/container-platform/4.3/architecture/architecture-rhcos.html)

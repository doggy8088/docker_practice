# 第十七章 容器其它生態

> **版本說明**：本章介紹的工具和執行時（Podman、Buildah、Skopeo、containerd、Kata Containers、gVisor、WasmEdge 等）都保持活躍的開發。建議：
> - 查閱各項目官方文件獲取最新版本
> - 在生產環境使用前驗證版本相容性
> - 關注官方發布說明了解重大變更

本章將介紹 Docker 和 Kubernetes 之外的容器生態技術。

## 本章內容

* [Fedora CoreOS 簡介](17.1_coreos_intro.md)
  * 專為容器化工作負載設計的作業系統。

* [Fedora CoreOS 安裝與設定](17.2_coreos_install.md)
  * CoreOS 的安裝方式與基本設定。

* [Podman](17.3_podman.md)
  * 相容 Docker CLI 的下一代無守護程序容器引擎。

* [Buildah](17.4_buildah.md)
  * 無需守護程序的 OCI 容器映象建立工具。

* [Skopeo](17.5_skopeo.md)
  * 遠端檢查和管理容器映象的利器。

* [containerd](17.6_containerd.md)
  * 作為現代容器生態基石的核心容器執行時。

* [安全容器執行時](17.7_secure_runtime.md)
  * 透過提供更強隔離性來保證安全的技術方案（如 Kata Containers、gVisor）。

* [WebAssembly](17.8_wasm.md)
  * 一種極具潛力的輕量級跨平臺二進位指令格式。

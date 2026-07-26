# 第十七章 容器其它生態

> **版本說明（核驗日期：2026-05-16）**：本章介紹的工具和執行時（Podman、Buildah、Skopeo、containerd、Kata Containers、gVisor、WasmEdge 等）都保持活躍的開發。建議：
> - 查閱各項目官方文件獲取最新版本
> - 在生產環境使用前驗證版本相容性
> - 關注官方發布說明了解重大變更

本章將介紹 Docker 和 Kubernetes 之外的容器生態技術。

同時，Docker 自身的生態也在向雲建立、AI 本地推理和企業級桌面安全擴充套件。當前需要額外關注：

* **Docker Model Runner**：在 Docker Desktop / Docker Engine 中管理、執行和服務本地 AI 模型，支援 OpenAI 與 Ollama 相容 API，並可將 GGUF、Safetensors 等模型檔案作為 OCI Artifact 管理。
* **Docker Build Cloud**：透過遠端 BuildKit 和共享建立快取加速本地與 CI 建立，適合多平臺映象和團隊共享快取場景。
* **Docker Offload**：把容器建立和執行解除安裝到雲端，適合 VDI、受限本機或不支援巢狀虛擬化的開發環境。
* **Hardened Docker Desktop / Enhanced Container Isolation (ECI)**：透過更強的命名空間隔離、敏感掛載保護和系統呼叫限制降低桌面容器逃逸風險。

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

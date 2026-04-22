# 附錄七：術語表

本附錄整理了本書中常見的一些專業術語及其解釋。

## A

* **Alpine**：一個輕量級的 Linux 發行版，常作為基礎映象用於建立體積較小的 Docker 映象。
* **API (Application Programming Interface)**：應用程式程式設計介面，Docker Daemon 提供 RESTful API 供用戶端或外部程式與之互動。

## B

* **Base Image (基礎映象)**：沒有父映象的映象，通常是作業系統的最小安裝集合（如 `ubuntu` 或 `alpine`）。
* **BuildKit**：Docker 下一代的建立引擎，提供了更高的建立效能、更好的快取處理和併發建立支援。
* **Buildx**：Docker CLI 的一個外掛，擴充套件了建立功能，支援 BuildKit 的所有高階屬性，例如多系統架構映象建立。

## C

* **Cgroups (Control Groups)**：控制組，Linux 核心屬性，用於限制、記錄、隔離程序組使用的物理資源（如 CPU、記憶體、磁碟 I/O 等）。
* **Cluster (叢集)**：一組協同工作的節點（如主機、虛擬機等），在容器領域常指 Kubernetes 叢集。
* **Compose (Docker Compose)**：用於定義和執行多容器 Docker 應用程式的工具，透過 YAML 檔案設定應用服務。
* **Container (容器)**：映象的執行實例，帶有額外的可寫檔案層，具有獨立性。
* **Containerd**：行業標準的容器執行時，核心功能是管理宿主機上容器的生命週期（建立、啟動、停止、銷燬）。

## D

* **Daemon (守護程序)**：Docker 的後台守護程序，負責接收和處理 Docker API 請求，並管理映象、容器、網路和數據卷等物件。
* **Docker**：開源的應用容器引擎，讓開發者可以打包應用程式及其依賴套件到一個可移植的容器中，然後發布到任何流行的 Linux 或 Windows 機器上。
* **Docker Desktop**：包含 Docker Engine、Docker CLI 用戶端、Docker Compose 和 Kubernetes 等的桌面應用程式，適用於 macOS 和 Windows。
* **Docker Hub**：Docker 官方的公共映象倉庫服務，提供容器映象的儲存和分發。
* **Dockerfile**：包含用於組合映象的指令的文字檔案，Docker 透過讀取 `Dockerfile` 中的指令即可自動完成映象建立。

## E

* **Etcd**：一個高可用、強一致性的分散式鍵值儲存系統，常用於容器叢集（如 Kubernetes）的服務發現和狀態設定管理。

## I

* **Image (映象)**：Docker 映象是一個只讀樣板，帶有建立 Docker 容器的說明。

## K

* **Kubernetes (K8s)**：開源的容器編排引擎，用於自動化容器化應用程式的部署、擴充套件和管理。

## L

* **Layer (映象層)**：Docker 映象由多個只讀層疊合而成，每一層通常代表 Dockerfile 中的一條指令的操作結果，透過聯合檔案系統（UFS）疊加在一起形成完整的檔案系統。

## M

* **Multistage Build (多階段建立)**：Dockerfile 中的屬性，允許在同一個 Dockerfile 中使用多個 `FROM` 語句，從一個階段複製所需的建立產物到另一個階段，從而大幅減小最終映象的體積。

## N

* **Namespace (命名空間)**：Linux 核心屬性，用於隔離各種系統資源，如程序、網路、掛載點等，使容器看起來就像是一個獨立的作業系統。
* **Node (節點)**：容器叢集（如 Kubernetes）中的一台工作機器，可以是物理機或虛擬機。

## O

* **OCI (Open Container Initiative)**：開放容器規範，由多家行業領頭企業共同制定的容器執行時和映象格式的行業標準。
* **Orchestration (編排)**：自動化部署、管理、擴充套件和網路設定容器的系統和技術（如 Kubernetes）。

## P

* **Pod**：Kubernetes 中最小的、可部署的計算單元，包含一個或多個緊密相關的容器，共享相同的網路命名空間和儲存。
* **Prometheus**：開源的系統監控和告警工具包，廣泛應用於雲原生的監控體系中。

## R

* **Registry (註冊伺服器)**：提供 Docker 映象下載和上傳等儲存分發服務的伺服器。
* **Repository (倉庫)**：集中存放某個應用的所有映象的地方，通常由映象名定義。一個 Registry 中可以包含多個 Repository。

## S

* **Swarm (Docker Swarm)**：Docker 原生的叢集和編排管理工具，可將多個 Docker 主機組合成一個統一的虛擬 Docker 主機池。

## U

* **UFS (Union File System)**：聯合檔案系統，一種分層、輕量級並且高效能的檔案系統，它支援對檔案系統的修改一層層疊加。

## V

* **Volume (資料卷)**：專為繞過聯合檔案系統而設計的特殊目錄，用於實現容器資料的持久化，或在多個容器之間提供檔案共享。

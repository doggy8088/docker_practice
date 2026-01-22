# Compose 簡介

`Compose` 專案是 Docker 官方的開源專案，負責實現對 Docker 容器叢集的快速編排。從功能上看，跟 `OpenStack` 中的 `Heat` 十分類似。

其程式碼目前在 [https://github.com/docker/compose](https://github.com/docker/compose) 上開源。

`Compose` 定位是 「定義和執行多個 Docker 容器的應用（Defining and running multi-container Docker applications）」，其前身是開源專案 Fig。

透過第一部分中的介紹，我們知道使用一個 `Dockerfile` 樣板檔案，可以讓使用者很方便的定義一個單獨的應用容器。然而，在日常工作中，經常會碰到需要多個容器相互配合來完成某項任務的情況。例如要實現一個 Web 專案，除了 Web 服務容器本身，往往還需要再加上後端的資料庫服務容器，甚至還包括負載均衡容器等。

`Compose` 恰好滿足了這樣的需求。它允許使用者透過一個單獨的 `docker-compose.yml` 樣板檔案（YAML 格式）來定義一組相關聯的應用容器為一個專案（project）。

## 樣板檔案規範

Compose 樣板檔案採用 YAML 格式，副檔名為 `.yml` 或 `.yaml`。

> **注意**：自 Compose V2 起，`version` 欄位已不再強制要求。在 Docker Compose v5 中，規範已完全不需要頂層 `version` 欄位。為了保持最佳相容性，建議不在新檔案中使用該欄位。

Docker Compose 預設使用 `docker-compose.yml` 作為樣板檔案。

`Compose` 中有兩個重要的概念：

* 服務 (`service`)：一個應用的容器，實際上可以包括若干執行相同映象的容器實例。

* 專案 (`project`)：由一組關聯的應用容器組成的一個完整業務單元，在 `docker-compose.yml` 檔案中定義。

`Compose` 的預設管理物件是專案，透過子指令對專案中的一組容器進行便捷地生命週期管理。

`Compose` 專案由 Python 編寫，實現上呼叫了 Docker 服務提供的 API 來對容器進行管理。因此，只要所操作的平台支援 Docker API，就可以在其上利用 `Compose` 來進行編排管理。

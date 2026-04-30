# 第十一章 Docker Compose

`Docker Compose` 是 Docker 官方編排 (Orchestration) 專案之一，負責快速的部署分散式應用。

> ⚠️ **重要提示：Compose V1 已停止支援**
>
> 早期基於 Python 編寫的 Compose V1（指令為 `docker-compose`）已於 2023 年中正式停止支援。現已全面升級為基於 Go 編寫的 Compose V2，作為 Docker CLI 的官方外掛提供（指令為 `docker compose`，中間為空格）。本書強烈推薦且後續章節均以 V2 為核心標準進行講解。

## Docker Compose 解決什麼問題？

在學習 Compose 之前，筆者想強調它的真正價值。假設你正在開發一個微服務應用——前端、後端、資料庫三個服務。如果你用 Docker 容器分別執行它們，你會遇到這些問題：

1. **啟動順序**：需要先啟資料庫，再啟後端，最後啟前端
2. **網路連線**：三個容器需要能彼此通訊
3. **卷掛載**：本地程式碼需要對映到容器內
4. **環境變數**：每個服務的設定需要逐個設定

使用 `docker run` 逐個啟動的話，需要記住 3 條複雜的指令。而 **Docker Compose 的核心價值就是用一個 YAML 檔案來定義整個應用**，然後一條指令 `docker compose up` 啟動所有服務。這是 Compose 被廣泛採用的原因——它極大地簡化了本地開發和測試的複雜性。

**誰應該學 Compose？** 任何使用 Docker 進行本地開發的人，以及需要快速部署多容器應用的團隊。

本章將介紹 `Compose` 專案情況以及安裝和使用。

* [簡介](11.1_introduction.md)
* [安裝與解除安裝](11.2_install.md)
* [使用](11.3_usage.md)
* [指令說明](11.4_commands.md)
* [Compose 樣板檔案](11.5_compose_file.md)
* [實戰 Django](11.6_django.md)
* [實戰 Rails](11.7_rails.md)
* [實戰 WordPress](11.8_wordpress.md)
* [實戰 LNMP](11.9_lnmp.md)

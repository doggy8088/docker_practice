# 第十一章 Docker Compose

`Docker Compose` 是 Docker 官方編排 (Orchestration) 專案之一，負責快速的部署分散式應用。

> ⚠️ **重要提示：Compose V1 已停止支援**
> 
> 早期基於 Python 編寫的 Compose V1（指令為 `docker-compose`）已於 2023 年中正式停止支援。現已全面升級為基於 Go 編寫的 Compose V2，作為 Docker CLI 的官方外掛提供（指令為 `docker compose`，中間為空格）。本書強烈推薦且後續章節均以 V2 為核心標準進行講解。

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

# Docker 指令查詢

本節涵蓋了相關內容與詳細描述，主要探討以下幾個方面：

## 概述

總體概述了以下內容。

## 基本語法

Docker 指令有兩大類，用戶端指令和伺服器端指令。前者是主要的操作介面，後者用來啟動 Docker Daemon。

* 用戶端指令：基本指令格式為 `docker [OPTIONS] COMMAND [arg...]`；

* 伺服器端指令：基本指令格式為 `dockerd [OPTIONS]`。

可以透過 `man docker` 或 `docker help` 來檢視這些指令。

接下來的小節對這兩個指令進行介紹。

# 修訂記錄

* 1.5.4 2026-02-15
  * 移除 combine.py
  * 修復若干問題


* 1.5.3 2026-02-15
  * 修復 CI 流程中的圖片引用路徑錯誤
  * 修復 CODEOWNERS 檔案路徑對應問題
  * 更新專案設定版本號

* 1.5.0 2026-02-05
  * 全面重構章節目錄結構 (01-15)
  * 支援 Docker Engine v30.x
  * 最佳化文件圖片引用路徑

* 1.4.0 2026-01-11
  * 全面支援 Docker Engine v29 新版本
  * 更新 Docker Compose 至 v2.40.x
  * 更新 Kubernetes 相關章節至 1.35 版本
  * BuildKit 已成為預設穩定建構式，移除實驗屬性說明
  * 新增 Docker Scout、Docker Init 相關內容
  * 更新映象加速器設定
  * 新增 CentOS EOL 警告，推薦使用 Rocky Linux/AlmaLinux
  * 擴充安全章節和底層架構章節內容

* 1.3.0 2021-12-31
  * 全面支援 Docker v20.10 新版本
  * 新增 Docker Compose v2
  * Docker Hub 自動建立轉為付費功能

* 1.2.0 2020-12-20
  * 錯誤修復

* 1.1.0 2019-12-31
  * 全面支援 Docker v19.03 新版本
  * 增加 `BuildKit`
  * 增加 `docker buildx` 指令使用說明
  * 增加 `docker manifest` 指令使用說明
  * 移除 `Ubuntu 14.04` `Debian 8` `Debian 7`

* 1.0.0: 2018-12-31
  * 全面支援 Docker v18.x 新版本
  * 新增如何除錯 Docker
  * 錯誤修正

* 0.9.0: 2017-12-31
  * 對 v1.13.x 舊版本的最後支援

* 0.9.0-rc2: 2017-12-10

  * 增加 Docker 中文資源連結
  * 增加介紹基於 Docker 的 CI/CD 工具 `Drone`
  * 增加 `docker secret` 相關內容
  * 增加 `docker config` 相關內容
  * 增加 `LinuxKit` 相關內容

  * 更新 `CoreOS` 章節
  * 更新 `etcd` 章節，基於 3.x 版本

  * 刪除 `Docker Compose` 中的 `links`指令

  * 替換 `docker daemon` 指令為 `dockerd`
  * 替換 `docker ps` 指令為 `docker container ls`
  * 替換 `docker images` 指令為 `docker image ls`

  * 修改 `安裝 Docker` 一節中部分文字表述

  * 移除歷史遺留檔案和錯誤的檔案
  * 最佳化文字排版
  * 調整目錄結構
  * 修復內容邏輯錯誤
  * 修復`404` 連結

* 0.9.0-rc1: 2017-11-29

  * 根據最新版本（v17.09）修訂內容

  * 增加 `Dockerfile` 多階段建立( `multistage builds` ) `Docker 17.05` 新增屬性
  * 增加 `docker exec` 子指令介紹
  * 增加 `docker` 管理子指令 `container` `image` `network` `volume` 介紹
  * 增加 `樹莓派單片電腦` 安裝 Docker
  * 增加 Docker 儲存驅動 `OverlayFS` 相關內容

  * 更新 `Docker CE` `v17.x` 安裝說明
  * 更新 `Docker 網路` 一節
  * 更新 `Docker Machine` 基於 0.13.0 版本
  * 更新 `Docker Compose` 基於 3 檔案格式

  * 刪除 `Docker Swarm` 相關內容，替換為 `Swarm mode` `Docker 1.12.0` 新增屬性
  * 刪除 `docker run` `--link` 引數

  * 精簡 `Docker Registry` 一節

  * 替換 `docker run` `-v` 引數為 `--mount`

  * 修復 `404` 連結
  * 最佳化文字排版
  * 增加離線閱讀功能

* 0.8.0: 2017-01-08

  * 修正文字內容
  * 根據最新版本（1.12）修訂安裝使用
  * 補充附錄章節

* 0.7.0: 2016-06-12

  * 根據最新版本進行指令調整
  * 修正若干文字描述

* 0.6.0: 2015-12-24

  * 補充 Machine 專案
  * 修正若干 bug

* 0.5.0: 2015-06-29

  * 新增 Compose 專案
  * 新增 Machine 專案
  * 新增 Swarm 專案
  * 完善 Kubernetes 專案內容
  * 新增 Mesos 專案內容

* 0.4.0: 2015-05-08

  * 新增 Etcd 專案
  * 新增 Fig 專案
  * 新增 CoreOS 專案
  * 新增 Kubernetes 專案

* 0.3.0: 2014-11-25

  * 完成倉庫章節
  * 重寫安全章節
  * 修正底層實現章節的架構、命名空間、控制組、檔案系統、容器格式等內容
  * 新增對常見倉庫和映象的介紹
  * 新增 Dockerfile 的介紹
  * 重新校訂中英文混排格式
  * 修訂文字表達
  * 發布繁體版本分支：zh-Hant

* 0.2.0: 2014-09-18

  * 對照官方文件重寫介紹、基本概念、安裝、映象、容器、倉庫、資料管理、網路等章節
  * 新增底層實現章節
  * 新增指令查詢和資源連結章節
  * 其它修正

* 0.1.0: 2014-09-05

  * 新增基本內容
  * 修正錯別字和表達不通順的地方

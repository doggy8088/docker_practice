# Drone CI Demo 專案

這是一個基於 Go 語言編寫的簡單 Web 應用範例，用於示範 Drone CI 的持續整合流程。

## 目錄結構

*   `app.go`: 簡單的 Go Web 伺服器程式碼。
*   `.drone.yml`: Drone CI 的設定檔案，定義了建立和測試流程。
*   `Dockerfile`: 定義了如何將該應用建立為 Docker 映象。

## 如何執行

1.  確保本地已安裝 Docker 環境。
2.  進入本目錄建立映象：
    ```bash
    docker build -t drone-demo-app .
    ```
3.  執行容器：
    ```bash
    docker run -p 8080:8080 drone-demo-app
    ```
4.  訪問 `http://localhost:8080` 檢視效果。

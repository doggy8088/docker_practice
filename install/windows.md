# Windows 10 安裝 Docker

## 系統要求

[Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/) 支援 64 位版本的 Windows 10 Pro，且必須開啟 Hyper-V（若版本為 v1903 及以上則無需開啟 Hyper-V），或者 64 位版本的 Windows 10 Home v1903 及以上版本。

## 安裝

**手動下載安裝**

點選以下 [連結](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe) 下載 Docker Desktop for Windows。

下載好之後雙擊 `Docker Desktop Installer.exe` 開始安裝。

**使用 [winget](https://docs.microsoft.com/zh-cn/windows/package-manager/) 安裝**

```powershell
$ winget install Docker.DockerDesktop
```

## 在 WSL2 執行 Docker 

若你的 Windows 版本為 Windows 10 專業版或家庭版 v1903 及以上版本可以使用 WSL2 執行 Docker，具體請檢視 [Docker Desktop WSL 2 backend](https://docs.docker.com/docker-for-windows/wsl/)。

## 執行

在 Windows 搜尋欄輸入 **Docker** 點選 **Docker Desktop** 開始執行。

![](./_images/install-win-docker-app-search.png)

Docker 啟動之後會在 Windows 工具列出現鯨魚圖示。

![](./_images/install-win-taskbar-circle.png)

等待片刻，當鯨魚圖示靜止時，說明 Docker 啟動成功，之後你可以開啟 PowerShell 使用 Docker。

> 推薦使用 [Windows Terminal](https://docs.microsoft.com/zh-cn/windows/terminal/get-started) 在終端使用 Docker。

## 映象加速

如果在使用過程中發現拉取 Docker 映象十分緩慢，可以設定 Docker [國內映象加速](mirror.md)。

## 參考連結

* [官方文件](https://docs.docker.com/docker-for-windows/install/)
* [WSL 2 Support is coming to Windows 10 Versions 1903 and 1909](https://devblogs.microsoft.com/commandline/wsl-2-support-is-coming-to-windows-10-versions-1903-and-1909/)

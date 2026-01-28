# macOS

## 系統要求

[Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/) 要求系統最低為 macOS Monterey 12.0 或更高版本，建議升級到最新版本的 macOS（如 Sonoma 或 Ventura）。

## 安裝

### 使用 Homebrew 安裝

[Homebrew](https://brew.sh/) 的 [Cask](https://github.com/Homebrew/homebrew-cask) 已經支援 Docker Desktop for Mac，因此可以很方便的使用 Homebrew Cask 來進行安裝：

```bash
$ brew install --cask docker
```

### 手動下載安裝

如果需要手動下載，請點選以下 [連結](https://desktop.docker.com/mac/main/amd64/Docker.dmg) 下載 Docker Desktop for Mac。

> 如果你的電腦搭載的是 M1 晶片（`arm64` 架構），請點選以下 [連結](https://desktop.docker.com/mac/main/arm64/Docker.dmg) 下載 Docker Desktop for Mac。你可以在 [官方文件](https://docs.docker.com/docker-for-mac/apple-silicon/) 查閱已知的問題。

如同 macOS 其它軟體一樣，安裝也非常簡單，雙擊下載的 `.dmg` 檔案，然後將那隻叫 [Moby](https://www.docker.com/blog/call-me-moby-dock/) 的鯨魚圖示拖拽到 `Application` 資料夾即可（其間需要輸入使用者密碼）。

![](../.gitbook/assets/install-mac-dmg.png)

## 執行

從應用中找到 Docker 圖示並點選執行。

![](../.gitbook/assets/install-mac-apps.png)

執行之後，會在右上角選單欄看到多了一個鯨魚圖示，這個圖示表明了 Docker 的執行狀態。

![](../.gitbook/assets/install-mac-menubar.png)

每次點選鯨魚圖示會彈出操作選單。

![](../.gitbook/assets/install-mac-menu.png)

之後，你可以在終端透過指令檢查安裝後的 Docker 版本。

```bash
$ docker --version
Docker version 26.1.1, build 4cf5afa
```

如果 `docker version`、`docker info` 都正常的話，可以嘗試執行一個 [Nginx 伺服器](https://hub.docker.com/_/nginx/)：

```bash
$ docker run -d -p 80:80 --name webserver nginx
```

服務執行後，可以訪問 [http://localhost](http://localhost)，如果看到了 "Welcome to nginx!"，就說明 Docker Desktop for Mac 安裝成功了。

![](../.gitbook/assets/install-mac-example-nginx.png)

要停止 Nginx 伺服器並刪除執行下面的指令：

```bash
$ docker stop webserver
$ docker rm webserver
```

## 映象加速

如果在使用過程中發現拉取 Docker 映象十分緩慢，可以設定 Docker [國內映象加速](mirror.md)。

## 參考連結

* [官方文件](https://docs.docker.com/docker-for-mac/install/)

## 用戶端指令 - docker

### 用戶端指令選項

* `--config=""`：指定用戶端設定檔案，預設為 `~/.docker`；
* `-D=true|false`：是否使用 debug 模式。預設不開啟；
* `-H, --host=[]`：指定指令對應 Docker 守護程序的監聽介面，可以為 unix 套接字 `unix:///path/to/socket`，檔案句柄 `fd://socketfd` 或 tcp 套接字 `tcp://[host[:port]]`，預設為 `unix:///var/run/docker.sock`；
* `-l, --log-level="debug|info|warn|error|fatal"`：指定日誌輸出級別；
* `--tls=true|false`：是否對 Docker 守護程序啟用 TLS 安全機制，預設為否；
* `--tlscacert=/.docker/ca.pem`：TLS CA 簽名的可信證書檔案路徑；
* `--tlscert=/.docker/cert.pem`：TLS 可信證書檔案路徑；
* `--tlskey=/.docker/key.pem`：TLS 金鑰檔案路徑；
* `--tlsverify=true|false`：啟用 TLS 校驗，預設為否。

### 用戶端指令

可以透過 `docker COMMAND --help` 來檢視這些指令的具體用法。

* `attach`：依附到一個正在執行的容器中；
* `build`：從一個 Dockerfile 建立一個映象；
* `commit`：從一個容器的修改中建立一個新的映象；
* `cp`：在容器和本地宿主系統之間複製檔案中；
* `create`：建立一個新容器，但並不執行它；
* `diff`：檢查一個容器內檔案系統的修改，包括修改和增加；
* `events`：從伺服器端獲取實時的事件；
* `exec`：在執行的容器內執行指令；
* `export`：匯出容器內容為一個 `tar` 套件；
* `history`：顯示一個映象的歷史訊息；
* `images`：列出存在的映象；
* `import`：匯入一個檔案 (典型為 `tar` 套件) 路徑或目錄來建立一個本地映象；
* `info`：顯示一些相關的系統訊息；
* `inspect`：顯示一個容器的具體設定訊息；
* `kill`：關閉一個執行中的容器 (包括程序和所有相關資源)；
* `load`：從一個 tar 套件中載入一個映象；
* `login`：註冊或登入到一個 Docker 的倉庫伺服器；
* `logout`：從 Docker 的倉庫伺服器登出；
* `logs`：獲取容器的 log 訊息；
* `network`：管理 Docker 的網路，包括檢視、建立、刪除、掛載、解除安裝等；
* `node`：管理 swarm 叢集中的節點，包括檢視、更新、刪除、提升/取消管理節點等；
* `pause`：暫停一個容器中的所有程序；
* `port`：查詢一個 nat 到一個私有網口的公共口；
* `ps`：列出主機上的容器；
* `pull`：從一個 Docker 的倉庫伺服器下拉一個映象或倉庫；
* `push`：將一個映象或者倉庫推送到一個 Docker 的註冊伺服器；
* `rename`：重新命名一個容器；
* `restart`：重啟一個執行中的容器；
* `rm`：刪除給定的若干個容器；
* `rmi`：刪除給定的若干個映象；
* `run`：建立一個新容器，並在其中執行給定指令；
* `save`：儲存一個映象為 tar 套件檔案；
* `search`：在 Docker index 中搜索一個映象；
* `service`：管理 Docker 所啟動的應用服務，包括建立、更新、刪除等；
* `start`：啟動一個容器；
* `stats`：輸出 (一個或多個) 容器的資源使用統計訊息；
* `stop`：終止一個執行中的容器；
* `swarm`：管理 Docker swarm 叢集，包括建立、加入、退出、更新等；
* `tag`：為一個映象打標籤；
* `top`：檢視一個容器中的正在執行的程序訊息；
* `unpause`：將一個容器內所有的程序從暫停狀態中恢復；
* `update`：更新指定的若干容器的設定訊息；
* `version`：輸出 Docker 的版本訊息；
* `volume`：管理 Docker volume，包括檢視、建立、刪除等；
* `wait`：阻塞直到一個容器終止，然後輸出它的退出符。

### 一張圖總結 Docker 的指令

如圖 16-1 所示，Docker 常用用戶端指令可按功能分組理解。

![Docker 指令總結](../../_images/cmd_logic.png)

圖 16-1 Docker 用戶端指令分類示意圖

### 參考

* [官方文件](https://docs.docker.com/reference/cli/docker/)

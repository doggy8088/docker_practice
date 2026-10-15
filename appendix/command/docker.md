## 用戶端指令 - docker

### 用戶端指令選項

* `--config=""`：指定用戶端設定檔案，預設為 `~/.docker`；
* `-D=true|false`：是否使用 debug 模式。預設不開啟；
* `-H, --host=[]`：指定指令對應 Docker 守護程序的監聽介面，可以為 unix 套接字 `unix:///path/to/socket`，檔案句柄 `fd://socketfd` 或 tcp 套接字 `tcp://[host[:port]]`，預設為 `unix:///var/run/docker.sock`；
* `-c, --context=""`：指定連線守護程序時使用的上下文名稱，優先於 `DOCKER_HOST` 環境變數和 `docker context use` 設定的預設上下文；
* `-l, --log-level="debug|info|warn|error|fatal"`：指定日誌輸出級別；
* `--tls=true|false`：是否對 Docker 守護程序啟用 TLS 安全機制，預設為否；
* `--tlscacert=~/.docker/ca.pem`：TLS CA 簽名的可信證書檔案路徑；
* `--tlscert=~/.docker/cert.pem`：TLS 可信證書檔案路徑；
* `--tlskey=~/.docker/key.pem`：TLS 金鑰檔案路徑；
* `--tlsverify=true|false`：啟用 TLS 校驗，預設為否。

### 用戶端指令

可以透過 `docker COMMAND --help` 來檢視這些指令的具體用法。

* `attach`：依附到一個正在執行的容器中；
* `build`：從一個 Dockerfile 建立一個映象；
* `builder`：管理建構式與建立快取，包括檢視、清理等；
* `buildx`：擴充套件建立能力 (BuildKit)，支援多平臺建立、建立快取匯入匯出等（CLI 外掛，詳見第 10 章）；
* `checkpoint`：管理容器檢查點，用於儲存和恢復容器執行狀態（實驗屬性）；
* `commit`：從一個容器的修改中建立一個新的映象；
* `compose`：定義並執行多容器應用（CLI 外掛，詳見第 11 章）；
* `config`：管理 swarm 叢集中的設定項，包括建立、檢視、刪除等；
* `container`：管理容器，`run`、`ps`、`exec` 等均是其子指令的快捷形式；
* `context`：管理連線上下文，在多個 Docker 守護程序之間切換；
* `cp`：在容器和本地宿主系統之間複製檔案；
* `create`：建立一個新容器，但並不執行它；
* `diff`：檢查一個容器內檔案系統的修改，包括修改和增加；
* `events`：從伺服器端獲取實時的事件；
* `exec`：在執行的容器內執行指令；
* `export`：匯出容器內容為一個 `tar` 套件；
* `history`：顯示一個映象的歷史訊息；
* `image`：管理映象，`images`、`pull`、`build` 等均是其子指令的快捷形式；
* `images`：列出存在的映象；
* `import`：匯入一個檔案（典型為 `tar` 套件）路徑或目錄來建立一個本地映象；
* `info`：顯示一些相關的系統訊息；
* `init`：為專案生成 Dockerfile、compose.yaml 等初始檔案（CLI 外掛）；
* `inspect`：顯示一個容器的具體設定訊息；
* `kill`：關閉一個執行中的容器（包括程序和所有相關資源）；
* `load`：從一個 tar 套件中載入一個映象；
* `login`：註冊或登入到一個 Docker 的倉庫伺服器；
* `logout`：從 Docker 的倉庫伺服器登出；
* `logs`：獲取容器的 log 訊息；
* `manifest`：管理映象的 manifest 與 manifest list，用於發布多架構映象；
* `network`：管理 Docker 的網路，包括檢視、建立、刪除、掛載、解除安裝等；
* `node`：管理 swarm 叢集中的節點，包括檢視、更新、刪除、提升/取消管理節點等；
* `pause`：暫停一個容器中的所有程序；
* `plugin`：管理 Docker 外掛，包括安裝、啟用、停用、刪除等；
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
* `scout`：分析映象的軟體成分與已知漏洞（CLI 外掛）；
* `search`：在 Docker Hub 中搜索映象；
* `secret`：管理 swarm 叢集中的金鑰，包括建立、檢視、刪除等；
* `service`：管理 Docker 所啟動的應用服務，包括建立、更新、刪除等；
* `stack`：管理 swarm 叢集中的應用棧，包括部署、檢視、刪除等；
* `start`：啟動一個容器；
* `stats`：輸出（一個或多個）容器的資源使用統計訊息；
* `stop`：終止一個執行中的容器；
* `swarm`：管理 Docker swarm 叢集，包括建立、加入、退出、更新等；
* `system`：管理 Docker 本身，包括檢視磁碟佔用、清理無用資料、訂閱事件等；
* `tag`：為一個映象打標籤；
* `top`：檢視一個容器中的正在執行的程序訊息；
* `unpause`：將一個容器內所有的程序從暫停狀態中恢復；
* `update`：更新指定的若干容器的設定訊息；
* `version`：輸出 Docker 的版本訊息；
* `volume`：管理 Docker volume，包括檢視、建立、刪除等；
* `wait`：阻塞直到一個容器終止，然後輸出它的退出符。

### 一張圖總結 Docker 的指令

如圖 A-1 所示，Docker 常用用戶端指令可按功能分組理解。

![Docker 指令總結](../../_images/cmd_logic.jpg)

圖 A-1：Docker 用戶端指令分類示意圖

### 參考

* [官方文件](https://docs.docker.com/reference/cli/docker/)

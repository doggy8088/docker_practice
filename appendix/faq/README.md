# 附錄一：常見問題與錯誤速查

更多錯誤排查條目見 [常見錯誤處理](errors.md)。

## 映象相關

### 如何批次清理臨時映象檔案？

答：可以使用 `docker image prune` 指令。

### 如何檢視映象支援的環境變數？

答：可以使用 `docker run IMAGE env` 指令。

### 本地的映象檔案都存放在哪裡？

答：在 Linux 上，全新安裝的 Docker Engine 29 及以後版本預設使用 containerd 映象儲存。獨立執行的 containerd 預設將映象內容和容器快照儲存在 `/var/lib/containerd`，卷和 Docker 設定等資料仍儲存在 `/var/lib/docker`。沿用經典 `overlay2` 驅動的安裝將映象層儲存在 Docker 資料目錄下的 `overlay2/`。具體路徑取決於後端和設定，詳見 [Docker 資料目錄](https://docs.docker.com/engine/daemon/#daemon-data-directory)。

### 建立 Docker 映象應該遵循哪些原則？

答：整體原則上，儘量保持映象功能的明確和內容的精簡，要點包括

* 儘量選取滿足需求但較小的基礎系統映象，例如大部分時候可以選擇 `alpine` 映象，僅有不足六兆大小；
* 清理編譯生成檔案、安裝套件的快取等臨時檔案；
* 安裝各個軟體時候要指定準確的版本號，並避免引入不需要的依賴；
* 從安全角度考慮，應用要儘量使用系統的函式庫和依賴；
* 如果安裝應用時候需要設定一些特殊的環境變數，在安裝後要還原不需要保持的變數值；
* 使用 Dockerfile 建立映象時候要新增 .dockerignore 檔案或使用乾淨的工作目錄。

更多內容請檢視 [Dockerfile 最佳實踐](../best_practices.md)

### 碰到網路問題，無法 pull 映象，指令行指定 http\_proxy 無效？

答：先區分代理要作用在哪一層。Docker daemon 拉取映象時，推薦在 `daemon.json` 的 `proxies` 欄位或 systemd drop-in 中設定 `HTTP_PROXY` / `HTTPS_PROXY` / `NO_PROXY`，然後重啟 Docker 服務。Docker CLI、建立過程和容器內應用的代理應分別使用 `~/.docker/config.json`、`--build-arg` 或 `docker run --env` 設定；不要把 `export http_proxy=...` 當作 `daemon.json` 內容寫入。

## 容器相關

### 容器退出後，透過 docker container ls 指令檢視不到，資料會丟失麼？

答：容器退出後會處於終止 (exited) 狀態，此時可以透過 `docker container ls -a` 檢視。其中的資料也不會丟失，還可以透過 `docker start` 指令來啟動它。只有刪除掉容器才會清除所有資料。

### 如何停止所有正在執行的容器？

答：可以使用 `docker stop $(docker container ls -q)` 指令。

### 如何批次清理已經停止的容器？

答：可以使用 `docker container prune` 指令。

### 如何獲取某個容器的 PID 訊息？

答：可以使用

```bash
docker inspect --format '{{ .State.Pid }}' <CONTAINER ID or NAME>
```

### 如何獲取某個容器的 IP 地址？

答：可以使用

```bash
docker inspect --format '{{ .NetworkSettings.IPAddress }}' <CONTAINER ID or NAME>
```

### 如何給容器指定一個固定 IP 地址，而不是每次重啟容器 IP 地址都會變？

答：使用以下指令啟動容器可以使容器 IP 固定不變

```bash
$ docker network create -d bridge --subnet 172.25.0.0/16 my-net

$ docker run --network=my-net --ip=172.25.3.3 -itd --name=my-container busybox
```

這個固定 IP 主要用於同一 Docker daemon 內的容器間通訊。Docker Desktop 上不要依賴宿主機直接訪問 Linux 容器 IP；宿主機訪問容器服務仍應使用連接埠對映或 `host.docker.internal` 等機制。

### 如何臨時退出一個正在互動的容器的終端，而不終止它？

答：按 `Ctrl-p Ctrl-q`。如果按 `Ctrl-c` 往往會讓容器內應用程序終止，進而會終止容器。

### 使用 `docker port` 指令對映容器的連接埠時，系統報錯 『Error：No public port 「80」 published for xxx』？

答：

* 建立容器時用 `-p HOST_PORT:CONTAINER_PORT` 或 `--publish` 顯式發布連接埠，例如 `docker run -p 8080:80 nginx`；
* 只想把映象宣告的 `EXPOSE` 連接埠隨機發布到宿主機連接埠時，用 `-P` / `--publish-all`，之後透過 `docker ps` 檢視實際連接埠；
* `Dockerfile` 中的 `EXPOSE` 只是映象元資料，不會自動發布連接埠。

### 可以在一個容器中同時執行多個應用程序麼？

答：一般並不推薦在同一個容器內執行多個應用程序。如果有類似需求，可以透過一些額外的程序管理機制，比如 `supervisord` 來管理所執行的程序。可以參考 [Docker 官方說明](https://docs.docker.com/engine/containers/multi-service_container/)。

### 如何控制容器佔用 CPU、記憶體等系統資源的份額？

答：在使用 `docker create` 指令建立容器或使用 `docker run` 建立並啟動容器的時候，可以使用 -c|--cpu-shares\[=0] 引數來調整容器使用 CPU 的權重；使用 -m|--memory\[=MEMORY] 引數來調整容器使用記憶體的大小。

## 倉庫相關

### 倉庫、註冊伺服器、註冊索引有何關係？

首先，倉庫是存放一組關聯映象的集合，比如同一個應用的不同版本的映象。

註冊伺服器是存放實際的映象檔案的地方。註冊索引則負責維護使用者的賬號、許可權、搜尋、標籤等的管理。因此，註冊伺服器利用註冊索引來實現認證等管理。

## 設定相關

### Docker 的設定檔案放在哪裡，如何修改設定？

答：使用 `systemd` 的系統（如 Ubuntu 22.04+、Debian 12+、Rocky/Alma/CentOS Stream 9+）的設定檔案在 `/etc/docker/daemon.json`。

### 如何更改 Docker 的預設儲存位置？

答：在 Linux 上，執行 `docker info --format '{{.DockerRootDir}}'` 可檢視 Docker 的資料目錄。可透過 `/etc/docker/daemon.json` 的 `data-root` 指定新位置。使用獨立的 containerd 映象儲存時，還需單獨設定 containerd 的 `root`。設定新路徑前先備份原資料；修改路徑本身不會搬遷已有資料。詳見 [Docker 資料目錄設定](https://docs.docker.com/engine/daemon/#configure-the-data-directory-location)。

### 使用記憶體和 swap 限制啟動容器時候報核心不支援警告？

答：如果遇到 `WARNING: Your kernel does not support cgroup swap limit` 等警告，這是因為系統預設沒有開啟對記憶體和 swap 使用的統計功能，引入該功能會帶來效能的下降。要開啟該功能，可以採取如下操作：

* 編輯 `/etc/default/grub` 檔案（Ubuntu 系統為例），設定 `GRUB_CMDLINE_LINUX="cgroup_enable=memory swapaccount=1"`
* 更新 grub：`$ sudo update-grub`
* 重啟系統，即可。

## Docker 與虛擬化

### Docker 與 LXC 有何不同？

答：LXC 利用 Linux 上相關技術實現了容器。Docker 則在如下的幾個方面進行了改進：

* 移植性：透過抽象容器設定，容器可以實現從一個平台移植到另一個平台；
* 映象系統：基於 OverlayFS 的映象系統為容器的分發帶來了很多的便利，同時共同的映象層只需要儲存一份，實現高效率的儲存；
* 版本管理：類似於 Git 的版本管理理念，使用者可以更方便的建立、管理映象檔案；
* 倉庫系統：倉庫系統大大降低了映象的分發和管理的成本；
* 周邊工具：各種現有工具（設定管理、雲平台）對 Docker 的支援，以及基於 Docker 的 PaaS、CI 等系統，讓 Docker 的應用更加方便和多樣化。

### Docker 與 Vagrant 有何不同？

答：Docker 將應用及其依賴打包為映象，並在容器中執行。Vagrant 用設定檔案描述開發機器，可以透過虛擬機提供程式建立整套客戶作業系統。

### 開發環境中 Docker 和 Vagrant 該如何選擇？

答：若要讓團隊複用同一套應用服務，可用 Docker Compose 描述服務，並在 macOS 或 Windows 上用 [Docker Desktop](https://docs.docker.com/desktop/) 執行 Linux 容器。若需要測試特定核心、系統啟動過程或整台虛擬機的設定，可用 Vagrant 管理相應的虛擬機。

## 其他

### Docker 能在非 Linux 平台上執行麼？比如 Windows 或 macOS

答：完全可以。安裝方法請檢視[安裝 Docker](../../03_install/README.md) 一節

### 如何將一台宿主主機的 Docker 環境遷移到另外一台宿主主機？

答：在新主機上用原部署設定重新建立服務，重新拉取映象，並備份、恢復資料卷和繫結掛載中的應用資料。對執行中的資料庫，先製作一致性備份。僅複製 `/var/lib/docker` 會遺漏繫結掛載和獨立 containerd 資料目錄中的內容。

### 如何進入 Docker 容器的網路命名空間？

答：在執行 Docker Engine 的 Linux 主機上，可以透過容器主程序的 PID 找到其網路命名空間。下例為它註冊一個臨時名稱，檢視網路介面後移除名稱。先將 `container_id` 設為執行中容器的名稱或 ID。

```bash
$ pid=$(docker inspect --format='{{.State.Pid}}' "$container_id")
$ sudo ip netns attach "docker-$pid" "$pid"
$ sudo ip netns exec "docker-$pid" ip address show
$ sudo ip netns delete "docker-$pid"
```

### 如何獲取容器繫結到本地哪個 veth 介面上？

答：Docker 容器啟動後，會通過 veth 介面對連線到本地網橋，veth 介面命名跟容器命名毫無關係，十分難以找到對應關係。

最簡單的一種方式是透過檢視介面的索引號，在容器中執行 `ip a` 指令，檢視到本地介面最前面的介面索引號，如 `205`，將此值加上 1，即 `206`，然後在本地主機執行 `ip a` 指令，查詢介面索引號為 `206` 的介面，兩者即為連線的 veth 介面對。

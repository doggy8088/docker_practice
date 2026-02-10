# 附錄一：常見問題總結

## 映象相關

### 如何批次清理臨時映象檔案？

答：可以使用 `docker image prune` 指令。

### 如何檢視映象支援的環境變數？

答：可以使用 `docker run IMAGE env` 指令。

### 本地的映象檔案都存放在哪裡？

答：與 Docker 相關的本地資源預設存放在 `/var/lib/docker/` 目錄下，以 `overlay2` 檔案系統為例，其中 `containers` 目錄存放容器訊息，`image` 目錄存放映象訊息，`overlay2` 目錄下存放具體的映象層檔案。

### 建立 Docker 映象應該遵循哪些原則？

答：整體原則上，儘量保持映象功能的明確和內容的精簡，要點包括

* 儘量選取滿足需求但較小的基礎系統映象，例如大部分時候可以選擇 `alpine` 映象，僅有不足六兆大小；
* 清理編譯生成檔案、安裝套件的快取等臨時檔案；
* 安裝各個軟體時候要指定準確的版本號，並避免引入不需要的依賴；
* 從安全角度考慮，應用要儘量使用系統的函式庫和依賴；
* 如果安裝應用時候需要設定一些特殊的環境變數，在安裝後要還原不需要保持的變數值；
* 使用 Dockerfile 建立映象時候要新增 .dockerignore 檔案或使用乾淨的工作目錄。

更多內容請檢視 [Dockerfile 最佳實踐](../16.1_best_practices.md)

### 碰到網路問題，無法 pull 映象，指令行指定 http\_proxy 無效？

答：在 Docker 設定檔案中新增 `export http_proxy="http://<PROXY_HOST>:<PROXY_PORT>"`，之後重啟 Docker 服務即可。

## 容器相關

### 容器退出後，透過 docker container ls 指令檢視不到，資料會丟失麼？

答：容器退出後會處於終止（exited）狀態，此時可以透過 `docker container ls -a` 檢視。其中的資料也不會丟失，還可以透過 `docker start` 指令來啟動它。只有刪除掉容器才會清除所有資料。

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

### 如何臨時退出一個正在互動的容器的終端，而不終止它？

答：按 `Ctrl-p Ctrl-q`。如果按 `Ctrl-c` 往往會讓容器內應用程序終止，進而會終止容器。

### 使用 `docker port` 指令對映容器的連接埠時，系統報錯『Error: No public port '80' published for xxx』？

答：

* 建立映象時 `Dockerfile` 要透過 `EXPOSE` 指定正確的開放連接埠；
* 容器啟動時指定 `PublishAllPort = true`。

### 可以在一個容器中同時執行多個應用程序麼？

答：一般並不推薦在同一個容器內執行多個應用程序。如果有類似需求，可以透過一些額外的程序管理機制，比如 `supervisord` 來管理所執行的程序。可以參考 https://docs.docker.com/config/containers/multi-service\_container/ 。

### 如何控制容器佔用系統資源（CPU、記憶體）的份額？

答：在使用 `docker create` 指令建立容器或使用 `docker run` 建立並啟動容器的時候，可以使用 -c|--cpu-shares\[=0] 引數來調整容器使用 CPU 的權重；使用 -m|--memory\[=MEMORY] 引數來調整容器使用記憶體的大小。

## 倉庫相關

### 倉庫（Repository）、註冊伺服器（Registry）、註冊索引（Index） 有何關係？

首先，倉庫是存放一組關聯映象的集合，比如同一個應用的不同版本的映象。

註冊伺服器是存放實際的映象檔案的地方。註冊索引則負責維護使用者的賬號、許可權、搜尋、標籤等的管理。因此，註冊伺服器利用註冊索引來實現認證等管理。

## 設定相關

### Docker 的設定檔案放在哪裡，如何修改設定？

答：使用 `systemd` 的系統（如 Ubuntu 16.04、Centos 等）的設定檔案在 `/etc/docker/daemon.json`。

### 如何更改 Docker 的預設儲存位置？

答：Docker 的預設儲存位置是 `/var/lib/docker`，如果希望將 Docker 的本地檔案儲存到其他分割槽，可以使用 Linux 軟連線的方式來完成，或者在啟動 daemon 時透過 `-g` 引數指定，或者修改設定檔案 `/etc/docker/daemon.json` 的 "data-root" 項 。可以使用 `docker system info | grep "Root Dir"` 檢視當前使用的儲存位置。

例如，如下操作將預設儲存位置遷移到 /storage/docker。

```
[root@s26 ~]# df -h
Filesystem                    Size  Used Avail Use% Mounted on
/dev/mapper/VolGroup-lv_root   50G  5.3G   42G  12% /
tmpfs                          48G  228K   48G   1% /dev/shm
/dev/sda1                     485M   40M  420M   9% /boot
/dev/mapper/VolGroup-lv_home  222G  188M  210G   1% /home
/dev/sdb2                     2.7T  323G  2.3T  13% /storage
[root@s26 ~]# service docker stop
[root@s26 ~]# cd /var/lib/
[root@s26 lib]# mv docker /storage/
[root@s26 lib]# ln -s /storage/docker/ docker
[root@s26 lib]# ls -la docker
lrwxrwxrwx. 1 root root 15 11月 17 13:43 docker -> /storage/docker
[root@s26 lib]# service docker start
```

### 使用記憶體和 swap 限制啟動容器時候報警告："WARNING: Your kernel does not support cgroup swap limit. WARNING: Your kernel does not support swap limit capabilities. Limitation discarded."？

答：這是因為系統預設沒有開啟對記憶體和 swap 使用的統計功能，引入該功能會帶來效能的下降。要開啟該功能，可以採取如下操作：

* 編輯 `/etc/default/grub` 檔案（Ubuntu 系統為例），設定 `GRUB_CMDLINE_LINUX="cgroup_enable=memory swapaccount=1"`
* 更新 grub：`$ sudo update-grub`
* 重啟系統，即可。

## Docker 與虛擬化

### Docker 與 LXC（Linux Container）有何不同？

答：LXC 利用 Linux 上相關技術實現了容器。Docker 則在如下的幾個方面進行了改進：

* 移植性：透過抽象容器設定，容器可以實現從一個平台移植到另一個平台；
* 映象系統：基於 OverlayFS 的映象系統為容器的分發帶來了很多的便利，同時共同的映象層只需要儲存一份，實現高效率的儲存；
* 版本管理：類似於Git的版本管理理念，使用者可以更方便的建立、管理映象檔案；
* 倉庫系統：倉庫系統大大降低了映象的分發和管理的成本；
* 周邊工具：各種現有工具（設定管理、雲平台）對 Docker 的支援，以及基於 Docker的 PaaS、CI 等系統，讓 Docker 的應用更加方便和多樣化。

### Docker 與 Vagrant 有何不同？

答：兩者的定位完全不同。

* Vagrant 類似 Boot2Docker（一款執行 Docker 的最小核心），是一套虛擬機的管理環境。Vagrant 可以在多種系統上和虛擬機軟體中執行，可以在 Windows，Mac 等非 Linux 平台上為 Docker 提供支援，自身具有較好的包裝性和移植性。
* 原生的 Docker 自身只能執行在 Linux 平台上，但啟動和執行的效能都比虛擬機要快，往往更適合快速開發和部署應用的場景。

簡單說：Vagrant 適合用來管理虛擬機，而 Docker 適合用來管理應用環境。

### 開發環境中 Docker 和 Vagrant 該如何選擇？

答：Docker 不是虛擬機，而是程序隔離，對於資源的消耗很少，但是目前需要 Linux 環境支援。Vagrant 是虛擬機上做的封裝，虛擬機本身會消耗資源。

如果本地使用的 Linux 環境，推薦都使用 Docker。

如果本地使用的是 macOS 或者 Windows 環境，那就需要開虛擬機，單一開發環境下 Vagrant 更簡單；多環境開發下推薦在 Vagrant 裡面再使用 Docker 進行環境隔離。

## 其它

### Docker 能在非 Linux 平台（比如 Windows 或 macOS ）上執行麼？

答：完全可以。安裝方法請檢視 [安裝 Docker](../../install/) 一節

### 如何將一台宿主主機的 Docker 環境遷移到另外一台宿主主機？

答：停止 Docker 服務。將整個 Docker 儲存資料夾複製到另外一台宿主主機，然後調整另外一台宿主主機的設定即可。

### 如何進入 Docker 容器的網路命名空間？

答：Docker 在建立容器後，刪除了宿主主機上 `/var/run/netns` 目錄中的相關的網路命名空間檔案。因此，在宿主主機上是無法看到或訪問容器的網路命名空間的。

使用者可以透過如下方法來手動恢復它。

首先，使用下面的指令檢視容器程序訊息，比如這裡的 1234。

```bash
$ docker inspect --format='{{. State.Pid}} ' $container_id
1234
```

接下來，在 `/proc` 目錄下，把對應的網路命名空間檔案連結到 `/var/run/netns` 目錄。

```bash
$ sudo ln -s /proc/1234/ns/net /var/run/netns/
```

然後，在宿主主機上就可以看到容器的網路命名空間訊息。例如

```bash
$ sudo ip netns show
1234
```

此時，使用者可以透過正常的系統指令來檢視或操作容器的命名空間了。例如修改容器的 IP 地址訊息為 `172.17.0.100/16`。

```bash
$ sudo ip netns exec 1234 ifconfig eth0 172.17.0.100/16
```

### 如何獲取容器繫結到本地那個 veth 介面上？

答：Docker 容器啟動後，會通過 veth 介面對連線到本地網橋，veth 介面命名跟容器命名毫無關係，十分難以找到對應關係。

最簡單的一種方式是透過檢視介面的索引號，在容器中執行 `ip a` 指令，檢視到本地介面最前面的介面索引號，如 `205`，將此值加上 1，即 `206`，然後在本地主機執行 `ip a` 指令，查詢介面索引號為 `206` 的介面，兩者即為連線的 veth 介面對。

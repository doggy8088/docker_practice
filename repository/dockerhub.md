# Docker Hub

目前 Docker 官方維護了一個公共倉庫 [Docker Hub](https://hub.docker.com/)，其中已經包括了數量超過 [10,000,000](https://hub.docker.com/search/?type=image) 的映象。大部分需求都可以透過在 Docker Hub 中直接下載映象來實現。

## 註冊

你可以在 https://hub.docker.com 免費註冊一個 Docker 賬號。

## 登入

可以透過執行 `docker login` 指令互動式的輸入使用者名及密碼來完成在指令行介面登入 Docker Hub。

你可以透過 `docker logout` 退出登入。

## 拉取映象

你可以透過 `docker search` 指令來查詢官方倉庫中的映象，並利用 `docker pull` 指令來將它下載到本地。

例如以 `centos` 為關鍵詞進行搜尋：

```bash
$ docker search centos
NAME                               DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
centos                             The official build of CentOS.                   6449      [OK]
ansible/centos7-ansible            Ansible on Centos7                              132                  [OK]
consol/centos-xfce-vnc             Centos container with "headless" VNC session…   126                  [OK]
jdeathe/centos-ssh                 OpenSSH / Supervisor / EPEL/IUS/SCL Repos - …   117                  [OK]
centos/systemd                     systemd enabled base container.                 96                   [OK]
```

可以看到回傳了很多包含關鍵字的映象，其中包括映象名字、描述、收藏數（表示該映象的受關注程度）、是否官方建立（`OFFICIAL`）、是否自動建立 （`AUTOMATED`）。

根據是否是官方提供，可將映象分為兩類。

一種是類似 `centos` 這樣的映象，被稱為基礎映象或根映象。這些基礎映象由 Docker 公司建立、驗證、支援、提供。這樣的映象往往使用單個單詞作為名字。

還有一種型別，比如 `ansible/centos7-ansible` 映象，它是由 Docker Hub 的註冊使用者建立並維護的，往往帶有使用者名稱字首。可以透過字首 `username/` 來指定使用某個使用者提供的映象，比如 ansible 使用者。

另外，在查詢的時候透過 `--filter=stars=N` 引數可以指定僅顯示收藏數量為 `N` 以上的映象。

下載官方 `centos` 映象到本地。

```bash
$ docker pull centos
Using default tag: latest
latest: Pulling from library/centos
7a0437f04f83: Pull complete
Digest: sha256:5528e8b1b1719d34604c87e11dcd1c0a20bedf46e83b5632cdeac91b8c04efc1
Status: Downloaded newer image for centos:latest
docker.io/library/centos:latest
```

## 推送映象

使用者也可以在登入後透過 `docker push` 指令來將自己的映象推送到 Docker Hub。

以下指令中的 `username` 請替換為你的 Docker 賬號使用者名。

```bash
$ docker tag ubuntu:24.04 username/ubuntu:24.04

$ docker image ls

REPOSITORY                                               TAG                    IMAGE ID            CREATED             SIZE
ubuntu                                                   24.04                  5a81c4b8502e        6 days ago          78.3MB
username/ubuntu                                          24.04                  5a81c4b8502e        6 days ago          78.3MB

$ docker push username/ubuntu:24.04

$ docker search username

NAME                      DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
username/ubuntu
```

## 自動建立

> 2021 年 7 月 26 日之後，該項功能僅限[付費使用者](https://www.docker.com/blog/changes-to-docker-hub-autobuilds/)使用。

自動建立（`Automated Builds`）可以自動觸發建立映象，方便升級映象。

有時候，使用者建立了映象，安裝了某個軟體，當軟體發布新版本則需要手動更新映象。

而自動建立允許使用者透過 Docker Hub 指定跟蹤一個目標網站（支援 [GitHub](https://github.com) 或 [BitBucket](https://bitbucket.org)）上的專案，一旦專案發生新的送出 （`commit`）或者建立了新的標籤（`tag`），Docker Hub 會自動建立映象並推送到 Docker Hub 中。

要設定自動建立，包括如下的步驟：

* 登入 Docker Hub；

* 在 Docker Hub 點選右上角頭像，在賬號設定（`Account Settings`）中關聯（`Linked Accounts`）目標網站；

* 在 Docker Hub 中新建或選擇已有的倉庫，在 `Builds` 頁籤中選擇 `Configure Automated Builds`；

* 選取一個目標網站中的專案（需要含 `Dockerfile`）和分支；

* 指定 `Dockerfile` 的位置，並儲存。

之後，可以在 Docker Hub 的倉庫頁面的 `Timeline` 頁籤中檢視每次建立的狀態。

# 啟動容器

啟動容器有兩種方式，一種是基於映象新建一個容器並啟動，另外一個是將在終止狀態（`exited`）的容器重新啟動。

因為 Docker 的容器實在太輕量級了，很多時候使用者都是隨時刪除和新創建容器。

## 新建並啟動

所需要的指令主要為 `docker run`。

例如，下面的指令輸出一個 『Hello World』，之後終止容器。

```bash
$ docker run ubuntu:24.04 /bin/echo 'Hello world'
Hello world
```

這跟在本地直接執行 `/bin/echo 'hello world'` 幾乎感覺不出任何區別。

下面的指令則啟動一個 bash 終端，允許使用者進行互動。

```bash
$ docker run -t -i ubuntu:24.04 /bin/bash
root@af8bae53bdd3:/#
```

其中，`-t` 選項讓Docker分配一個偽終端（pseudo-tty）並繫結到容器的標準輸入上， `-i` 則讓容器的標準輸入保持開啟。

在互動模式下，使用者可以透過所建立的終端來輸入指令，例如

```bash
root@af8bae53bdd3:/# pwd
/
root@af8bae53bdd3:/# ls
bin boot dev etc home lib lib64 media mnt opt proc root run sbin srv sys tmp usr var
```

當利用 `docker run` 來建立容器時，Docker 在後台執行的標準操作包括：

* 檢查本地是否存在指定的映象，不存在就從 [registry](../repository/README.md) 下載
* 利用映象建立並啟動一個容器
* 分配一個檔案系統，並在只讀的映象層外面掛載一層可讀寫層
* 從宿主主機設定的網橋接口中橋接一個虛擬介面到容器中去
* 從地址池設定一個 ip 地址給容器
* 執行使用者指定的應用程式
* 執行完畢後容器被終止

## 啟動已終止容器

可以利用 `docker container start` 指令，直接將一個已經終止（`exited`）的容器啟動執行。

容器的核心為所執行的應用程式，所需要的資源都是應用程式執行所必需的。除此之外，並沒有其它的資源。可以在偽終端中利用 `ps` 或 `top` 來檢視程序訊息。

```bash
root@ba267838cc1b:/# ps
  PID TTY          TIME CMD
    1 ?        00:00:00 bash
   11 ?        00:00:00 ps
```

可見，容器中僅執行了指定的 bash 應用。這種特點使得 Docker 對資源的利用率極高，是貨真價實的輕量級虛擬化。

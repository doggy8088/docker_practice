# 列出映象

要想列出已經下載下來的映象，可以使用 `docker image ls` 指令。

```bash
$ docker image ls
REPOSITORY           TAG                 IMAGE ID            CREATED             SIZE
redis                latest              5f515359c7f8        5 days ago          183 MB
nginx                latest              05a60462f8ba        5 days ago          181 MB
mongo                3.2                 fe9198c04d62        5 days ago          342 MB
<none>               <none>              00285df0df87        5 days ago          342 MB
ubuntu               18.04               329ed837d508        3 days ago          63.3MB
ubuntu               bionic              329ed837d508        3 days ago          63.3MB
```

清單包含了 `倉庫名`、`標籤`、`映象 ID`、`建立時間` 以及 `所佔用的空間`。

其中倉庫名、標籤在之前的基礎概念章節已經介紹過了。**映象 ID** 則是映象的唯一標識，一個映象可以對應多個 **標籤**。因此，在上面的例子中，我們可以看到 `ubuntu:18.04` 和 `ubuntu:bionic` 擁有相同的 ID，因為它們對應的是同一個映象。

## 映象體積

如果仔細觀察，會注意到，這裡標識的所佔用空間和在 Docker Hub 上看到的映象大小不同。比如，`ubuntu:18.04` 映象大小，在這裡是 `63.3MB`，但是在 [Docker Hub](https://hub.docker.com/layers/ubuntu/library/ubuntu/bionic/images/sha256-32776cc92b5810ce72e77aca1d949de1f348e1d281d3f00ebcc22a3adcdc9f42?context=explore) 顯示的卻是 `25.47 MB`。這是因為 Docker Hub 中顯示的體積是壓縮後的體積。在映象下載和上傳過程中映象是保持著壓縮狀態的，因此 Docker Hub 所顯示的大小是網路傳輸中更關心的流量大小。而 `docker image ls` 顯示的是映象下載到本地後，展開的大小，準確說，是展開後的各層所佔空間的總和，因為映象到本地後，檢視空間的時候，更關心的是本地磁碟空間佔用的大小。

另外一個需要注意的問題是，`docker image ls` 清單中的映象體積總和並非是所有映象實際硬碟消耗。由於 Docker 映象是多層儲存結構，並且可以繼承、複用，因此不同映象可能會因為使用相同的基礎映象，從而擁有共同的層。由於 Docker 使用 Union FS，相同的層只需要儲存一份即可，因此實際映象硬碟佔用空間很可能要比這個清單映象大小的總和要小的多。

你可以透過 `docker system df` 指令來便捷的檢視映象、容器、資料卷所佔用的空間。

```bash
$ docker system df

TYPE                TOTAL               ACTIVE              SIZE                RECLAIMABLE
Images              24                  0                   1.992GB             1.992GB (100%)
Containers          1                   0                   62.82MB             62.82MB (100%)
Local Volumes       9                   0                   652.2MB             652.2MB (100%)
Build Cache                                                 0B                  0B
```

## 虛懸映象

上面的映象清單中，還可以看到一個特殊的映象，這個映象既沒有倉庫名，也沒有標籤，均為 `<none>`。：

```bash
<none>               <none>              00285df0df87        5 days ago          342 MB
```

這個映象原本是有映象名和標籤的，原來為 `mongo:3.2`，隨著官方映象維護，發布了新版本後，重新 `docker pull mongo:3.2` 時，`mongo:3.2` 這個映象名被轉移到了新下載的映象身上，而舊的映象上的這個名稱則被取消，從而成為了 `<none>`。除了 `docker pull` 可能導致這種情況，`docker build` 也同樣可以導致這種現象。由於新舊映象同名，舊映象名稱被取消，從而出現倉庫名、標籤均為 `<none>` 的映象。這類無標籤映象也被稱為 **虛懸映象(dangling image)** ，可以用下面的指令專門顯示這類映象：

```bash
$ docker image ls -f dangling=true
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
<none>              <none>              00285df0df87        5 days ago          342 MB
```

一般來說，虛懸映象已經失去了存在的價值，是可以隨意刪除的，可以用下面的指令刪除。

```bash
$ docker image prune
```

## 中間層映象

為了加速映象建立、重複利用資源，Docker 會利用 **中間層映象**。所以在使用一段時間後，可能會看到一些依賴的中間層映象。預設的 `docker image ls` 清單中只會顯示頂層映象，如果希望顯示包括中間層映象在內的所有映象的話，需要加 `-a` 引數。

```bash
$ docker image ls -a
```

這樣會看到很多無標籤的映象，與之前的虛懸映象不同，這些無標籤的映象很多都是中間層映象，是其它映象所依賴的映象。這些無標籤映象不應該刪除，否則會導致上層映象因為依賴丟失而出錯。實際上，這些映象也沒必要刪除，因為之前說過，相同的層只會存一遍，而這些映象是別的映象的依賴，因此並不會因為它們被列出來而多存了一份，無論如何你也會需要它們。只要刪除那些依賴它們的映象後，這些依賴的中間層映象也會被連帶刪除。

## 列出部分映象

不加任何引數的情況下，`docker image ls` 會列出所有頂層映象，但是有時候我們只希望列出部分映象。`docker image ls` 有好幾個引數可以幫助做到這個事情。

根據倉庫名列出映象

```bash
$ docker image ls ubuntu
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              18.04               329ed837d508        3 days ago          63.3MB
ubuntu              bionic              329ed837d508        3 days ago          63.3MB
```

列出特定的某個映象，也就是說指定倉庫名和標籤

```bash
$ docker image ls ubuntu:18.04
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              18.04               329ed837d508        3 days ago          63.3MB
```

除此以外，`docker image ls` 還支援強大的過濾器引數 `--filter`，或者簡寫 `-f`。之前我們已經看到了使用過濾器來列出虛懸映象的用法，它還有更多的用法。比如，我們希望看到在 `mongo:3.2` 之後建立的映象，可以用下面的指令：

```bash
$ docker image ls -f since=mongo:3.2
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
redis               latest              5f515359c7f8        5 days ago          183 MB
nginx               latest              05a60462f8ba        5 days ago          181 MB
```

想檢視某個位置之前的映象也可以，只需要把 `since` 換成 `before` 即可。

此外，如果映象建立時，定義了 `LABEL`，還可以透過 `LABEL` 來過濾。

```bash
$ docker image ls -f label=com.example.version=0.1
...
```

## 以特定格式顯示

預設情況下，`docker image ls` 會輸出一個完整的表格，但是我們並非所有時候都會需要這些內容。比如，剛才刪除虛懸映象的時候，我們需要利用 `docker image ls` 把所有的虛懸映象的 ID 列出來，然後才可以交給 `docker image rm` 指令作為引數來刪除指定的這些映象，這個時候就用到了 `-q` 引數。

```bash
$ docker image ls -q
5f515359c7f8
05a60462f8ba
fe9198c04d62
00285df0df87
329ed837d508
329ed837d508
```

`--filter` 配合 `-q` 產生出指定範圍的 ID 清單，然後送給另一個 `docker` 指令作為引數，從而針對這組實體成批的進行某種操作的做法在 Docker 指令行使用過程中非常常見，不僅僅是映象，將來我們會在各個指令中看到這類搭配以完成很強大的功能。因此每次在文件看到過濾器後，可以多注意一下它們的用法。

另外一些時候，我們可能只是對錶格的結構不滿意，希望自己組織列；或者不希望有標題，這樣方便其它程式解析結果等，這就用到了 [Go 的樣板語法](https://gohugo.io/templates/introduction/)。

比如，下面的指令會直接列出映象結果，並且只包含映象ID和倉庫名：

```bash
$ docker image ls --format "{{.ID}}: {{.Repository}}"
5f515359c7f8: redis
05a60462f8ba: nginx
fe9198c04d62: mongo
00285df0df87: <none>
329ed837d508: ubuntu
329ed837d508: ubuntu
```

或者打算以表格等距顯示，並且有標題行，和預設一樣，不過自己定義列：

```bash
$ docker image ls --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}"
IMAGE ID            REPOSITORY          TAG
5f515359c7f8        redis               latest
05a60462f8ba        nginx               latest
fe9198c04d62        mongo               3.2
00285df0df87        <none>              <none>
329ed837d508        ubuntu              18.04
329ed837d508        ubuntu              bionic
```

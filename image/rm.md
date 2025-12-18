# 刪除本地映象

如果要刪除本地的映象，可以使用 `docker image rm` 指令，其格式為：

```bash
$ docker image rm [選項] <映象1> [<映象2> ...]
```

## 用 ID、映象名、摘要刪除映象

其中，`<映象>` 可以是 `映象短 ID`、`映象長 ID`、`映象名` 或者 `映象摘要`。

比如我們有這麼一些映象：

```bash
$ docker image ls
REPOSITORY                  TAG                 IMAGE ID            CREATED             SIZE
centos                      latest              0584b3d2cf6d        3 weeks ago         196.5 MB
redis                       alpine              501ad78535f0        3 weeks ago         21.03 MB
docker                      latest              cf693ec9b5c7        3 weeks ago         105.1 MB
nginx                       latest              e43d811ce2f4        5 weeks ago         181.5 MB
```

我們可以用映象的完整 ID，也稱為 `長 ID`，來刪除映象。使用指令碼的時候可能會用長 ID，但是人工輸入就太累了，所以更多的時候是用 `短 ID` 來刪除映象。`docker image ls` 預設列出的就已經是短 ID 了，一般取前3個字元以上，只要足夠區分於別的映象就可以了。

比如這裡，如果我們要刪除 `redis:alpine` 映象，可以執行：

```bash
$ docker image rm 501
Untagged: redis:alpine
Untagged: redis@sha256:f1ed3708f538b537eb9c2a7dd50dc90a706f7debd7e1196c9264edeea521a86d
Deleted: sha256:501ad78535f015d88872e13fa87a828425117e3d28075d0c117932b05bf189b7
Deleted: sha256:96167737e29ca8e9d74982ef2a0dda76ed7b430da55e321c071f0dbff8c2899b
Deleted: sha256:32770d1dcf835f192cafd6b9263b7b597a1778a403a109e2cc2ee866f74adf23
Deleted: sha256:127227698ad74a5846ff5153475e03439d96d4b1c7f2a449c7a826ef74a2d2fa
Deleted: sha256:1333ecc582459bac54e1437335c0816bc17634e131ea0cc48daa27d32c75eab3
Deleted: sha256:4fc455b921edf9c4aea207c51ab39b10b06540c8b4825ba57b3feed1668fa7c7
```

我們也可以用`映象名`，也就是 `<倉庫名>:<標籤>`，來刪除映象。

```bash
$ docker image rm centos
Untagged: centos:latest
Untagged: centos@sha256:b2f9d1c0ff5f87a4743104d099a3d561002ac500db1b9bfa02a783a46e0d366c
Deleted: sha256:0584b3d2cf6d235ee310cf14b54667d889887b838d3f3d3033acd70fc3c48b8a
Deleted: sha256:97ca462ad9eeae25941546209454496e1d66749d53dfa2ee32bf1faabd239d38
```

當然，更精確的是使用 `映象摘要` 刪除映象。

```bash
$ docker image ls --digests
REPOSITORY                  TAG                 DIGEST                                                                    IMAGE ID            CREATED             SIZE
node                        slim                sha256:b4f0e0bdeb578043c1ea6862f0d40cc4afe32a4a582f3be235a3b164422be228   6e0c4c8e3913        3 weeks ago         214 MB

$ docker image rm node@sha256:b4f0e0bdeb578043c1ea6862f0d40cc4afe32a4a582f3be235a3b164422be228
Untagged: node@sha256:b4f0e0bdeb578043c1ea6862f0d40cc4afe32a4a582f3be235a3b164422be228
```

## Untagged 和 Deleted

如果觀察上面這幾個指令的執行輸出訊息的話，你會注意到刪除行為分為兩類，一類是 `Untagged`，另一類是 `Deleted`。我們之前介紹過，映象的唯一標識是其 ID 和摘要，而一個映象可以有多個標籤。

因此當我們使用上面指令刪除映象的時候，實際上是在要求刪除某個標籤的映象。所以首先需要做的是將滿足我們要求的所有映象標籤都取消，這就是我們看到的 `Untagged` 的訊息。因為一個映象可以對應多個標籤，因此當我們刪除了所指定的標籤後，可能還有別的標籤指向了這個映象，如果是這種情況，那麼 `Delete` 行為就不會發生。所以並非所有的 `docker image rm` 都會產生刪除映象的行為，有可能僅僅是取消了某個標籤而已。

當該映象所有的標籤都被取消了，該映象很可能會失去了存在的意義，因此會觸發刪除行為。映象是多層儲存結構，因此在刪除的時候也是從上層向基礎層方向依次進行判斷刪除。映象的多層結構讓映象複用變得非常容易，因此很有可能某個其它映象正依賴於當前映象的某一層。這種情況，依舊不會觸發刪除該層的行為。直到沒有任何層依賴當前層時，才會真實的刪除當前層。這就是為什麼，有時候會奇怪，為什麼明明沒有別的標籤指向這個映象，但是它還是存在的原因，也是為什麼有時候會發現所刪除的層數和自己 `docker pull` 看到的層數不一樣的原因。

除了映象依賴以外，還需要注意的是容器對映象的依賴。如果有用這個映象啟動的容器存在（即使容器沒有執行），那麼同樣不可以刪除這個映象。之前講過，容器是以映象為基礎，再加一層容器儲存層，組成這樣的多層儲存結構去執行的。因此該映象如果被這個容器所依賴的，那麼刪除必然會導致故障。如果這些容器是不需要的，應該先將它們刪除，然後再來刪除映象。

## 用 docker image ls 指令來配合

像其它可以承接多個實體的指令一樣，可以使用 `docker image ls -q` 來配合使用 `docker image rm`，這樣可以成批的刪除希望刪除的映象。我們在『映象清單』章節介紹過很多過濾映象清單的方式都可以拿過來使用。

比如，我們需要刪除所有倉庫名為 `redis` 的映象：

```bash
$ docker image rm $(docker image ls -q redis)
```

或者刪除所有在 `mongo:3.2` 之前的映象：

```bash
$ docker image rm $(docker image ls -q -f before=mongo:3.2)
```

充分利用你的想象力和 Linux 指令行的強大，你可以完成很多非常讚的功能。

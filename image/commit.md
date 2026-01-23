# 利用 commit 理解映象構成

> 注意：如果您是初學者，您可以暫時跳過後面的內容，直接學習 [容器](../container/) 一節。

注意： `docker commit` 指令除了學習之外，還有一些特殊的應用場合，比如被入侵後儲存現場等。但是，不要使用 `docker commit` 定製映象，定製映象應該使用 `Dockerfile` 來完成。如果你想要定製映象請檢視下一小節。

映象是容器的基礎，每次執行 `docker run` 的時候都會指定哪個映象作為容器執行的基礎。在之前的例子中，我們所使用的都是來自於 Docker Hub 的映象。直接使用這些映象是可以滿足一定的需求，而當這些映象無法直接滿足需求時，我們就需要定製這些映象。接下來的幾節就將講解如何定製映象。

回顧一下之前我們學到的知識，映象是多層儲存，每一層是在前一層的基礎上進行的修改；而容器同樣也是多層儲存，是在以映象為基礎層，在其基礎上加一層作為容器執行時的儲存層。

現在讓我們以定製一個 Web 伺服器為例子，來講解映象是如何建立的。

```bash
$ docker run --name webserver -d -p 80:80 nginx
```

這條指令會用 `nginx` 映象啟動一個容器，命名為 `webserver`，並且對映了 80 連接埠，這樣我們可以用瀏覽器去訪問這個 `nginx` 伺服器。

如果是在本機執行的 Docker，那麼可以直接訪問：`http://localhost` ，如果是在虛擬機、雲服務器上安裝的 Docker，則需要將 `localhost` 換為虛擬機地址或者實際雲服務器地址。

直接用瀏覽器訪問的話，我們會看到預設的 Nginx 歡迎頁面。

![](../.gitbook/assets/images-mac-example-nginx.png)

現在，假設我們非常不喜歡這個歡迎頁面，我們希望改成歡迎 Docker 的文字，我們可以使用 `docker exec` 指令進入容器，修改其內容。

```bash
$ docker exec -it webserver bash
root@3729b97e8226:/# echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
root@3729b97e8226:/# exit
exit
```

我們以互動式終端方式進入 `webserver` 容器，並執行了 `bash` 指令，也就是獲得一個可操作的 Shell。

然後，我們用 `<h1>Hello, Docker!</h1>` 覆蓋了 `/usr/share/nginx/html/index.html` 的內容。

現在我們再重新整理瀏覽器的話，會發現內容被改變了。

![](../.gitbook/assets/images-create-nginx-docker.png)

我們修改了容器的檔案，也就是改動了容器的儲存層。我們可以透過 `docker diff` 指令看到具體的改動。

```bash
$ docker diff webserver
C /root
A /root/.bash_history
C /run
C /usr
C /usr/share
C /usr/share/nginx
C /usr/share/nginx/html
C /usr/share/nginx/html/index.html
C /var
C /var/cache
C /var/cache/nginx
A /var/cache/nginx/client_temp
A /var/cache/nginx/fastcgi_temp
A /var/cache/nginx/proxy_temp
A /var/cache/nginx/scgi_temp
A /var/cache/nginx/uwsgi_temp
```

現在我們定製好了變化，我們希望能將其儲存下來形成映象。

要知道，當我們執行一個容器的時候（如果不使用卷的話），我們做的任何檔案修改都會被記錄於容器儲存層裡。而 Docker 提供了一個 `docker commit` 指令，可以將容器的儲存層儲存下來成為映象。換句話說，就是在原有映象的基礎上，再疊加上容器的儲存層，並構成新的映象。以後我們執行這個新映象的時候，就會擁有原有容器最後的檔案變化。

`docker commit` 的語法格式為：

```bash
docker commit [選項] <容器ID或容器名> [<倉庫名>[:<標籤>]]
```

我們可以用下面的指令將容器儲存為映象：

```bash
$ docker commit \
    --author "Tao Wang <twang2218@gmail.com>" \
    --message "修改了預設網頁" \
    webserver \
    nginx:v2
sha256:07e33465974800ce65751acc279adc6ed2dc5ed4e0838f8b86f0c87aa1795214
```

其中 `--author` 是指定修改的作者，而 `--message` 則是記錄本次修改的內容。這點和 `git` 版本控制相似，不過這裡這些訊息可以省略留空。

我們可以在 `docker image ls` 中看到這個新定製的映象：

```bash
$ docker image ls nginx
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
nginx               v2                  07e334659748        9 seconds ago       181.5 MB
nginx               1.11                05a60462f8ba        12 days ago         181.5 MB
nginx               latest              e43d811ce2f4        4 weeks ago         181.5 MB
```

我們還可以用 `docker history` 具體檢視映象內的歷史記錄，如果比較 `nginx:latest` 的歷史記錄，我們會發現新增了我們剛剛送出的這一層。

```bash
$ docker history nginx:v2
IMAGE               CREATED             CREATED BY                                      SIZE                COMMENT
07e334659748        54 seconds ago      nginx -g daemon off;                            95 B                修改了預設網頁
e43d811ce2f4        4 weeks ago         /bin/sh -c #(nop)  CMD ["nginx" "-g" "daemon    0 B
<missing>           4 weeks ago         /bin/sh -c #(nop)  EXPOSE 443/tcp 80/tcp        0 B
<missing>           4 weeks ago         /bin/sh -c ln -sf /dev/stdout /var/log/nginx/   22 B
<missing>           4 weeks ago         /bin/sh -c apt-key adv --keyserver hkp://pgp.   58.46 MB
<missing>           4 weeks ago         /bin/sh -c #(nop)  ENV NGINX_VERSION=1.11.5-1   0 B
<missing>           4 weeks ago         /bin/sh -c #(nop)  MAINTAINER NGINX Docker Ma   0 B
<missing>           4 weeks ago         /bin/sh -c #(nop)  CMD ["/bin/bash"]            0 B
<missing>           4 weeks ago         /bin/sh -c #(nop) ADD file:23aa4f893e3288698c   123 MB
```

新的映象定製好後，我們可以來執行這個映象。

```bash
docker run --name web2 -d -p 81:80 nginx:v2
```

這裡我們命名為新的服務為 `web2`，並且對映到 `81` 連接埠。訪問 `http://localhost:81` 看到結果，其內容應該和之前修改後的 `webserver` 一樣。

至此，我們第一次完成了定製映象，使用的是 `docker commit` 指令，手動操作給舊的映象新增了新的一層，形成新的映象，對映象多層儲存應該有了更直觀的感覺。

## 慎用 `docker commit`

使用 `docker commit` 指令雖然可以比較直觀的幫助理解映象分層儲存的概念，但是實際環境中並不會這樣使用。

首先，如果仔細觀察之前的 `docker diff webserver` 的結果，你會發現除了真正想要修改的 `/usr/share/nginx/html/index.html` 檔案外，由於指令的執行，還有很多檔案被改動或新增了。這還僅僅是最簡單的操作，如果是安裝軟體套件、編譯建立，那會有大量的無關內容被新增進來，將會導致映象極為臃腫。

此外，使用 `docker commit` 意味著所有對映象的操作都是黑箱操作，生成的映象也被稱為 **黑箱映象**，換句話說，就是除了製作映象的人知道執行過什麼指令、怎麼生成的映象，別人根本無從得知。而且，即使是這個製作映象的人，過一段時間後也無法記清具體的操作。這種黑箱映象的維護工作是非常痛苦的。

而且，回顧之前提及的映象所使用的分層儲存的概念，除當前層外，之前的每一層都是不會發生改變的，換句話說，任何修改的結果僅僅是在當前層進行標記、新增、修改，而不會改動上一層。如果使用 `docker commit` 製作映象，以及後期修改的話，每一次修改都會讓映象更加臃腫一次，所刪除的上一層的東西並不會丟失，會一直如影隨形的跟著這個映象，即使根本無法訪問到。這會讓映象更加臃腫。

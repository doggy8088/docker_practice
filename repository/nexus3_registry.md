# Nexus3.x 的私有倉庫

使用 Docker 官方的 Registry 建立的倉庫面臨一些維護問題。比如某些映象刪除以後空間預設是不會回收的，需要一些指令去回收空間然後重啟 Registry。在企業中把內部的一些工具包放入 `Nexus` 中是比較常見的做法，最新版本 `Nexus3.x` 全面支援 Docker 的私有映象。所以使用 [`Nexus3.x`](https://www.sonatype.com/product/repository-oss-download) 一個軟體來管理 `Docker` , `Maven` , `Yum` , `PyPI` 等是一個明智的選擇。

## 啟動 Nexus 容器

```bash
$ docker run -d --name nexus3 --restart=always \
    -p 8081:8081 \
    --mount src=nexus-data,target=/nexus-data \
    sonatype/nexus3
```

首次執行需等待 3-5 分鐘，你可以使用 `docker logs nexus3 -f` 檢視日誌：

```bash
$ docker logs nexus3 -f

2021-03-11 15:31:21,990+0000 INFO  [jetty-main-1] *SYSTEM org.sonatype.nexus.bootstrap.jetty.JettyServer -
-------------------------------------------------

Started Sonatype Nexus OSS 3.30.0-01

-------------------------------------------------

```

如果你看到以上內容，說明 `Nexus` 已經啟動成功，你可以使用瀏覽器開啟 `http://YourIP:8081` 訪問 `Nexus` 了。

首次執行請透過以下指令獲取初始密碼：

```bash
$ docker exec nexus3 cat /nexus-data/admin.password

9266139e-41a2-4abb-92ec-e4142a3532cb
```

首次啟動 Nexus 的預設帳號是 `admin` ，密碼則是上邊指令獲取到的，點選右上角登入，首次登入需更改初始密碼。

登入之後可以點選頁面上方的齒輪按鈕按照下面的方法進行設定。

## 建立倉庫

建立一個私有倉庫的方法： `Repository->Repositories` 點選右邊選單 `Create repository` 選擇 `docker (hosted)`

* **Name**: 倉庫的名稱
* **HTTP**: 倉庫單獨的訪問連接埠（例如：**5001**）
* **Hosted -> Deployment pollcy**: 請選擇 **Allow redeploy** 否則無法上傳 Docker 映象。

其它的倉庫建立方法請各位自己摸索，還可以建立一個 `docker (proxy)` 型別的倉庫連結到 DockerHub 上。再建立一個 `docker (group)` 型別的倉庫把剛才的 `hosted` 與 `proxy` 新增在一起。主機在訪問的時候預設下載私有倉庫中的映象，如果沒有將連結到 DockerHub 中下載並快取到 Nexus 中。

## 新增訪問許可權

選單 `Security->Realms` 把 Docker Bearer Token Realm 移到右邊的框中保存。

新增使用者規則：選單 `Security->Roles`->`Create role`  在 `Privlleges` 選項搜尋 docker 把相應的規則移動到右邊的框中然後儲存。

新增使用者：選單 `Security->Users`->`Create local user` 在 `Roles` 選項中選中剛才建立的規則移動到右邊的視窗儲存。

## NGINX 加密代理

證書的生成請參見 [`私有倉庫高階設定`](registry_auth.md) 裡面證書生成一節。

NGINX 範例設定如下

```nginx
upstream register
{
    server "YourHostName OR IP":5001; #連接埠為上面新增私有映象倉庫時設定的 HTTP 選項的連接埠號
    check interval=3000 rise=2 fall=10 timeout=1000 type=http;
    check_http_send "HEAD / HTTP/1.0\r\n\r\n";
    check_http_expect_alive http_4xx;
}

server {
    server_name YourDomainName;#如果沒有 DNS 伺服器做解析，請刪除此選項使用本機 IP 地址訪問
    listen       443 ssl;

    ssl_certificate key/example.crt;
    ssl_certificate_key key/example.key;

    ssl_session_timeout  5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers   on;
    large_client_header_buffers 4 32k;
    client_max_body_size 300m;
    client_body_buffer_size 512k;
    proxy_connect_timeout 600;
    proxy_read_timeout   600;
    proxy_send_timeout   600;
    proxy_buffer_size    128k;
    proxy_buffers       4 64k;
    proxy_busy_buffers_size 128k;
    proxy_temp_file_write_size 512k;

    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_redirect off;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://register;
        proxy_read_timeout 900s;

    }
    error_page   500 502 503 504  /50x.html;
}
```

## Docker 主機訪問映象倉庫

如果不啟用 SSL 加密可以透過 [前面章節](./registry.md) 的方法新增非 https 倉庫地址到 Docker 的設定檔案中然後重啟 Docker。

使用 SSL 加密以後程式需要訪問就不能採用修改設定的方式了。具體方法如下：

```bash
$ openssl s_client -showcerts -connect YourDomainName OR HostIP:443 </dev/null 2>/dev/null|openssl x509 -outform PEM >ca.crt
$ cat ca.crt | sudo tee -a /etc/ssl/certs/ca-certificates.crt
$ systemctl restart docker
```

使用 `docker login YourDomainName OR HostIP` 進行測試，使用者名密碼填寫上面 Nexus 中設定的。

# 私有倉庫高階設定

上一節我們搭建了一個具有基礎功能的私有倉庫，本小節我們來使用 `Docker Compose` 搭建一個擁有許可權認證、TLS 的私有倉庫。

新建一個資料夾，以下步驟均在該資料夾中進行。

## 準備站點證書

如果你擁有一個網域名稱，國內各大雲服務商均提供免費的站點證書。你也可以使用 `openssl` 自行簽發證書。

這裡假設我們將要搭建的私有倉庫地址為 `docker.domain.com`，下面我們介紹使用 `openssl` 自行簽發 `docker.domain.com` 的站點 SSL 證書。

第一步建立 `CA` 私鑰。

```bash
$ openssl genrsa -out "root-ca.key" 4096
```

第二步利用私鑰建立 `CA` 根證書請求檔案。

```bash
$ openssl req \
          -new -key "root-ca.key" \
          -out "root-ca.csr" -sha256 \
          -subj '/C=CN/ST=Shanxi/L=Datong/O=Your Company Name/CN=Your Company Name Docker Registry CA'
```

>以上指令中 `-subj` 引數裡的 `/C` 表示國家，如 `CN`；`/ST` 表示省；`/L` 表示城市或者地區；`/O` 表示組織名；`/CN` 通用名稱。

第三步設定 `CA` 根證書，新建 `root-ca.cnf`。

```bash
[root_ca]
basicConstraints = critical,CA:TRUE,pathlen:1
keyUsage = critical, nonRepudiation, cRLSign, keyCertSign
subjectKeyIdentifier=hash
```

第四步簽發根證書。

```bash
$ openssl x509 -req  -days 3650  -in "root-ca.csr" \
               -signkey "root-ca.key" -sha256 -out "root-ca.crt" \
               -extfile "root-ca.cnf" -extensions \
               root_ca
```

第五步生成站點 `SSL` 私鑰。

```bash
$ openssl genrsa -out "docker.domain.com.key" 4096
```

第六步使用私鑰生成證書請求檔案。

```bash
$ openssl req -new -key "docker.domain.com.key" -out "site.csr" -sha256 \
          -subj '/C=CN/ST=Shanxi/L=Datong/O=Your Company Name/CN=docker.domain.com'
```

第七步設定證書，新建 `site.cnf` 檔案。

```bash
[server]
authorityKeyIdentifier=keyid,issuer
basicConstraints = critical,CA:FALSE
extendedKeyUsage=serverAuth
keyUsage = critical, digitalSignature, keyEncipherment
subjectAltName = DNS:docker.domain.com, IP:127.0.0.1
subjectKeyIdentifier=hash
```

第八步簽署站點 `SSL` 證書。

```bash
$ openssl x509 -req -days 750 -in "site.csr" -sha256 \
    -CA "root-ca.crt" -CAkey "root-ca.key"  -CAcreateserial \
    -out "docker.domain.com.crt" -extfile "site.cnf" -extensions server
```

這樣已經擁有了 `docker.domain.com` 的網站 SSL 私鑰 `docker.domain.com.key` 和 SSL 證書 `docker.domain.com.crt` 及 CA 根證書 `root-ca.crt`。

新建 `ssl` 資料夾並將 `docker.domain.com.key` `docker.domain.com.crt` `root-ca.crt` 這三個檔案移入，刪除其他檔案。

## 設定私有倉庫

私有倉庫預設的設定檔案位於 `/etc/docker/registry/config.yml`，我們先在本地編輯 `config.yml`，之後掛載到容器中。

```yaml
version: 0.1
log:
  accesslog:
    disabled: true
  level: debug
  formatter: text
  fields:
    service: registry
    environment: staging
storage:
  delete:
    enabled: true
  cache:
    blobdescriptor: inmemory
  filesystem:
    rootdirectory: /var/lib/registry
auth:
  htpasswd:
    realm: basic-realm
    path: /etc/docker/registry/auth/nginx.htpasswd
http:
  addr: :443
  host: https://docker.domain.com
  headers:
    X-Content-Type-Options: [nosniff]
  http2:
    disabled: false
  tls:
    certificate: /etc/docker/registry/ssl/docker.domain.com.crt
    key: /etc/docker/registry/ssl/docker.domain.com.key
health:
  storagedriver:
    enabled: true
    interval: 10s
threshold: 3
```

## 生成 http 認證檔案

```bash
$ mkdir auth

$ docker run --rm \
    --entrypoint htpasswd \
    httpd:alpine \
    -Bbn username password > auth/nginx.htpasswd
```

> 將上面的 `username` `password` 替換為你自己的使用者名和密碼。

## 編輯 `docker-compose.yml`

```yaml
version: '3'

services:
  registry:
    image: registry
    ports:
      - "443:443"
    volumes:
      - ./:/etc/docker/registry
      - registry-data:/var/lib/registry

volumes:
  registry-data:
```

## 修改 hosts

編輯 `/etc/hosts`

```bash
127.0.0.1 docker.domain.com
```

## 啟動

```bash
$ docker-compose up -d
```

這樣我們就搭建好了一個具有許可權認證、TLS 的私有倉庫，接下來我們測試其功能是否正常。

## 測試私有倉庫功能

由於自行簽發的 CA 根證書不被系統信任，所以我們需要將 CA 根證書 `ssl/root-ca.crt` 移入 `/etc/docker/certs.d/docker.domain.com` 資料夾中。

```bash
$ sudo mkdir -p /etc/docker/certs.d/docker.domain.com

$ sudo cp ssl/root-ca.crt /etc/docker/certs.d/docker.domain.com/ca.crt
```

登入到私有倉庫。

```bash
$ docker login docker.domain.com
```

嘗試推送、拉取映象。

```bash
$ docker pull ubuntu:18.04

$ docker tag ubuntu:18.04 docker.domain.com/username/ubuntu:18.04

$ docker push docker.domain.com/username/ubuntu:18.04

$ docker image rm docker.domain.com/username/ubuntu:18.04

$ docker pull docker.domain.com/username/ubuntu:18.04
```

如果我們退出登入，嘗試推送映象。

```bash
$ docker logout docker.domain.com

$ docker push docker.domain.com/username/ubuntu:18.04

no basic auth credentials
```

發現會提示沒有登入，不能將映象推送到私有倉庫中。

## 注意事項

如果你本機佔用了 `443` 連接埠，你可以設定 [Nginx 代理](https://docs.docker.com/registry/recipes/nginx/)，這裡不再贅述。

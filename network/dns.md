# 設定 DNS

如何自定義設定容器的主機名和 DNS 呢？秘訣就是 Docker 利用虛擬檔案來掛載容器的 3 個相關設定檔案。

在容器中使用 `mount` 指令可以看到掛載訊息：

```bash
$ mount
/dev/disk/by-uuid/1fec...ebdf on /etc/hostname type ext4 ...
/dev/disk/by-uuid/1fec...ebdf on /etc/hosts type ext4 ...
tmpfs on /etc/resolv.conf type tmpfs ...
```

這種機制可以讓宿主主機 DNS 訊息發生更新後，所有 Docker 容器的 DNS 設定透過 `/etc/resolv.conf` 檔案立刻得到更新。

設定全部容器的 DNS ，也可以在 `/etc/docker/daemon.json` 檔案中增加以下內容來設定。

```json
{
  "dns" : [
    "114.114.114.114",
    "8.8.8.8"
  ]
}
```

這樣每次啟動的容器 DNS 自動設定為 `114.114.114.114` 和 `8.8.8.8`。使用以下指令來證明其已經生效。

```bash
$ docker run -it --rm ubuntu:24.04  cat etc/resolv.conf

nameserver 114.114.114.114
nameserver 8.8.8.8
```

如果使用者想要手動指定容器的設定，可以在使用 `docker run` 指令啟動容器時加入如下引數：

`-h HOSTNAME` 或者 `--hostname=HOSTNAME` 設定容器的主機名，它會被寫到容器內的 `/etc/hostname` 和 `/etc/hosts`。但它在容器外部看不到，既不會在 `docker container ls` 中顯示，也不會在其他的容器的 `/etc/hosts` 看到。

`--dns=IP_ADDRESS` 新增 DNS 伺服器到容器的 `/etc/resolv.conf` 中，讓容器用這個服務器來解析所有不在 `/etc/hosts` 中的主機名。

`--dns-search=DOMAIN` 設定容器的搜尋域，當設定搜尋域為 `.example.com` 時，在搜尋一個名為 host 的主機時，DNS 不僅搜尋 host，還會搜尋 `host.example.com`。

>注意：如果在容器啟動時沒有指定最後兩個引數，Docker 會預設用主機上的 `/etc/resolv.conf` 來設定容器。

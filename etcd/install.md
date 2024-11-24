# 安裝

`etcd` 基於 `Go` 語言實現，因此，使用者可以從 [專案首頁](https://github.com/etcd-io/etcd) 下載原始碼自行編譯，也可以下載編譯好的二進位檔案，甚至直接使用製作好的 `Docker` 映象檔案來體驗。

>注意：本章節內容基於 etcd `3.4.x` 版本

## 二進位檔案方式下載

編譯好的二進位檔案都在 [github.com/etcd-io/etcd/releases](https://github.com/etcd-io/etcd/releases/) 頁面，使用者可以選擇需要的版本，或透過下載工具下載。

例如，使用 `curl` 工具下載壓縮封裝，並解壓。

```bash
$ curl -L https://github.com/etcd-io/etcd/releases/download/v3.4.0/etcd-v3.4.0-linux-amd64.tar.gz -o etcd-v3.4.0-linux-amd64.tar.gz

# 國內使用者可以使用以下方式加快下載
$ curl -L https://download.fastgit.org/etcd-io/etcd/releases/download/v3.4.0/etcd-v3.4.0-linux-amd64.tar.gz -o etcd-v3.4.0-linux-amd64.tar.gz

$ tar xzvf etcd-v3.4.0-linux-amd64.tar.gz
$ cd etcd-v3.4.0-linux-amd64
```

解壓後，可以看到檔案包括

```bash
$ ls
Documentation README-etcdctl.md README.md READMEv2-etcdctl.md etcd etcdctl
```

其中 `etcd` 是服務主檔案，`etcdctl` 是提供給使用者的指令用戶端，其他檔案是支援文件。

下面將 `etcd` `etcdctl` 檔案放到系統可執行目錄（例如 `/usr/local/bin/`）。

```bash
$ sudo cp etcd* /usr/local/bin/
```

預設 `2379` 連接埠處理用戶端的請求，`2380` 連接埠用於叢集各成員間的通訊。啟動 `etcd` 顯示類似如下的訊息：

```bash
$ etcd
...
2017-12-03 11:18:34.411579 I | embed: listening for peers on http://localhost:2380
2017-12-03 11:18:34.411938 I | embed: listening for client requests on localhost:2379
```

此時，可以使用 `etcdctl` 指令進行測試，設定和獲取鍵值 `testkey: "hello world"`，檢查 `etcd` 服務是否啟動成功：

```bash
$ ETCDCTL_API=3 etcdctl member list
8e9e05c52164694d, started, default, http://localhost:2380, http://localhost:2379

$ ETCDCTL_API=3 etcdctl put testkey "hello world"
OK

$ etcdctl get testkey
testkey
hello world
```

說明 etcd 服務已經成功啟動了。

## Docker 映象方式執行

映象名稱為 `quay.io/coreos/etcd`，可以透過下面的指令啟動 `etcd` 服務監聽到 `2379` 和 `2380` 連接埠。

```bash
$ docker run \
-p 2379:2379 \
-p 2380:2380 \
--mount type=bind,source=/tmp/etcd-data.tmp,destination=/etcd-data \
--name etcd-gcr-v3.4.0 \
quay.io/coreos/etcd:v3.4.0 \
/usr/local/bin/etcd \
--name s1 \
--data-dir /etcd-data \
--listen-client-urls http://0.0.0.0:2379 \
--advertise-client-urls http://0.0.0.0:2379 \
--listen-peer-urls http://0.0.0.0:2380 \
--initial-advertise-peer-urls http://0.0.0.0:2380 \
--initial-cluster s1=http://0.0.0.0:2380 \
--initial-cluster-token tkn \
--initial-cluster-state new \
--log-level info \
--logger zap \
--log-outputs stderr
```

開啟新的終端按照上一步的方法測試 `etcd` 是否成功啟動。

## macOS 中執行

```bash
$ brew install etcd

$ etcd

$ etcdctl member list
```

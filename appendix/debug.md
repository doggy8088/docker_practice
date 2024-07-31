# 如何除錯 Docker

## 開啟 Debug 模式

在 dockerd 設定檔案 daemon.json（預設位於 /etc/docker/）中新增

```json
{
  "debug": true
}
```

重啟守護程序。

```bash
$ sudo kill -SIGHUP $(pidof dockerd)
```

此時 dockerd 會在日誌中輸入更多訊息供分析。

## 檢查核心日誌

```bash
$ sudo dmesg |grep dockerd
$ sudo dmesg |grep runc
```

## Docker 不回應時處理

可以殺死 dockerd 程序檢視其堆疊呼叫情況。

```bash
$ sudo kill -SIGUSR1 $(pidof dockerd)
```

## 重置 Docker 本地資料

*注意，本操作會移除所有的 Docker 本地資料，包括映象和容器等。*

```bash
$ sudo rm -rf /var/lib/docker
```

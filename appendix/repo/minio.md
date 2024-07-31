# minio

**MinIO** 是一個基於 Apache License v2.0 開源協定的物件儲存服務。它相容亞馬遜 S3 雲儲存服務介面，非常適合於儲存大容量非結構化的資料，例如圖片、影片、日誌檔案、備份資料和容器/虛擬機映象等，而一個物件檔案可以是任意大小，從幾 kb 到最大 5T 不等。

MinIO 是一個非常輕量的服務,可以很簡單的和其他應用的結合，類似 NodeJS, Redis 或者 MySQL。

[官方文件](https://docs.min.io/)

## 簡單使用

測試、開發環境下不考慮資料儲存的情況下可以使用下面的指令快速開啟服務。

```bash
$ docker run -d -p 9000:9000 -p 9090:9090 minio/minio server /data --console-address ':9090'
```

## 離線部署

許多生產環境是一般是沒有公網資源的，這就需要從有公網資源的伺服器上把映象匯出，然後匯入到需要執行映象的內網伺服器。

### 匯出映象

在有公網資源的伺服器上下載好`minio/minio`映象

```bash
$ docker save -o minio.tar minio/minio:latest
```

> 使用docker save 的時候，也可以使用image id 來匯出，但是那樣匯出的時候，就會丟失原來的映象名稱，推薦，還是使用映象名字+tag來匯出映象

### 匯入映象

把壓縮文件複製到內網伺服器上，使用下面的指令匯入映象

```bash
$ docker load minio.tar 
```

### 執行 minio

- 把 `/mnt/data` 改成要替換的資料目錄
- 替換 `MINIO_ROOT_USER` 的值
- 替換 `MINIO_ROOT_PASSWORD` 的值
- 替換 name,minio1(可選)
- 如果 9000、9090 連接埠衝突,替換連接埠前面的如 `9009:9000`

```bash
$ sudo docker run -d -p 9000:9000 -p 9090:9090 --name minio1 \
  -e "MINIO_ROOT_USER=改成自己需要的" \
  -e "MINIO_ROOT_PASSWORD=改成自己需要的" \
  -v /mnt/data:/data \
  --restart=always \
  minio/minio server /data --console-address ':9090'
```

### 訪問 web 管理頁面

http://x.x.x.x:9090

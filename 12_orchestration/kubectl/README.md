# kubectl 使用

[kubectl](https://github.com/kubernetes/kubernetes) 是 Kubernetes 自帶的用戶端，可以用它來直接操作 Kubernetes。

使用格式有兩種：
```bash
kubectl [flags]
kubectl [command]
```

## get

顯示一個或多個資源

## describe

顯示資源詳情

## create

從檔案或標準輸入建立資源

## update

從檔案或標準輸入更新資源

## delete

透過檔案名、標準輸入、資源名或者 label selector 刪除資源

## logs

輸出 pod 中一個容器的日誌

## rollout

對 Deployment 等資源執行捲動更新/回滾

## exec

在容器內部執行指令

## port-forward

將本地連接埠轉發到Pod

## proxy

為 Kubernetes API server 啟動代理伺服器

## run

在叢集中使用指定映象啟動容器

## expose

將 replication controller service 或 pod 暴露為新的 kubernetes service

## label

更新資源的 label

## config

修改 kubernetes 設定檔案

## cluster-info

顯示叢集訊息

## api-versions

以 "組/版本" 的格式輸出伺服器端支援的 API 版本

## version

輸出伺服器端和用戶端的版本訊息

## help

顯示各個指令的幫助訊息

# Docker Desktop 啟用 Kubernetes

使用 Docker Desktop 可以很方便的啟用 Kubernetes，由於國內獲取不到 `k8s.gcr.io` 映象，我們必須首先解決這一問題。

## 獲取 `k8s.gcr.io` 映象

由於國內拉取不到 `k8s.gcr.io` 映象，我們可以使用開源專案 [AliyunContainerService/k8s-for-docker-desktop](https://github.com/AliyunContainerService/k8s-for-docker-desktop) 來獲取所需的映象。

## 啟用 Kubernetes

在 Docker Desktop 設定頁面，點選 `Kubernetes`，選擇 `Enable Kubernetes`，稍等片刻，看到左下方 `Kubernetes` 變為 `running`，Kubernetes 啟動成功。

![](https://github.com/AliyunContainerService/k8s-for-docker-desktop/raw/master/images/k8s.png)

## 測試

```bash
$ kubectl version
```

如果正常輸出訊息，則證明 Kubernetes 成功啟動。

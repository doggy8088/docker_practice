## Docker Desktop 啟用 Kubernetes

使用 Docker Desktop 可以很方便的啟用 Kubernetes。

### 啟用 Kubernetes

在 Docker Desktop 設定頁面，點選 `Kubernetes`，選擇 `Enable Kubernetes`，稍等片刻，看到左下方 `Kubernetes` 變為 `running`，Kubernetes 啟動成功。

![](https://github.com/docker/docs/raw/main/assets/images/desktop/settings-kubernetes.png)

> 注意：Kubernetes 的映象儲存在 `registry.k8s.io`，如果國內網路無法直接訪問，可以在 Docker Desktop 設定中的 `Docker Engine` 處設定映象加速器，或者利用國內雲服務商的映象倉庫手動拉取映象並 retag。

### 測試

執行以下指令：

```bash
$ kubectl version
```

如果正常輸出訊息，則證明 Kubernetes 成功啟動。

# Kubernetes 實戰練習

本章將透過一個具體的案例：部署一個 Nginx 網站，併為其設定 Service 和 Ingress，來串聯前面學到的知識。

## 目標

1.  部署一個 Nginx Deployment。
2.  建立一個 Service 暴露 Nginx。
3.  （可選）透過 Ingress 訪問服務。

## 步驟 1：建立 Deployment

建立一個名為 `nginx-deployment.yaml` 的檔案：

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.24
        ports:
        - containerPort: 80
```

應用設定：

```bash
kubectl apply -f nginx-deployment.yaml
```

## 步驟 2：建立 Service

建立一個名為 `nginx-service.yaml` 的檔案：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: NodePort # 使用 NodePort 方便本地測試
```

應用設定：

```bash
kubectl apply -f nginx-service.yaml
```

檢視分配的連接埠：

```bash
kubectl get svc nginx-service
```

如果輸出連接埠是 `80:30080/TCP`，你可以透過 `http://<NodeIP>:30080` 訪問 Nginx。

## 步驟 3：模擬捲動更新 (Rolling Update)

修改 `nginx-deployment.yaml`，將映象版本改為 `nginx:latest`。

```bash
kubectl apply -f nginx-deployment.yaml
```

觀察更新過程：

```bash
kubectl rollout status deployment/nginx-deployment
```

## 步驟 4：清理資源

練習結束後，記得清理資源：

```bash
kubectl delete -f nginx-service.yaml
kubectl delete -f nginx-deployment.yaml
```

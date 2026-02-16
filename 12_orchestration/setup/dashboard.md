## Kubernetes Dashboard

[Kubernetes Dashboard](https://github.com/kubernetes/dashboard) 是基於網頁的 Kubernetes 使用者介面。

![](https://d33wubrfki0l68.cloudfront.net/349824f68836152722dab89465835e604719caea/6e0b7/images/docs/ui-dashboard.png)

### 部署

執行以下指令即可部署 Dashboard：

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml
```

### 訪問

透過指令行代理訪問，執行以下指令：

```bash
$ kubectl proxy
```

到 http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/ 即可訪問。

### 登入

目前，Dashboard 僅支援使用 Bearer 令牌登入。下面教大家如何建立該令牌：

```bash
$ kubectl create sa dashboard-admin -n kube-system

$ kubectl create clusterrolebinding dashboard-admin --clusterrole=cluster-admin --serviceaccount=kube-system:dashboard-admin

$ ADMIN_SECRET=$(kubectl get secrets -n kube-system | grep dashboard-admin | awk '{print $1}')

$ DASHBOARD_LOGIN_TOKEN=$(kubectl describe secret -n kube-system ${ADMIN_SECRET} | grep -E '^token' | awk '{print $2}')

echo ${DASHBOARD_LOGIN_TOKEN}
```

將結果貼上到登入頁面，即可登入。

### 參考文件

* [官方文件](https://kubernetes.io/zh/docs/tasks/access-application-cluster/web-ui-dashboard/)

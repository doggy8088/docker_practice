# Kubernetes 高階屬性

掌握了 Kubernetes 的核心概念（Pod, Service, Deployment）後，我們需要瞭解更多高階屬性以建立生產級應用。

## Helm - 套件管理工具

[Helm](https://helm.sh/) 被稱為 Kubernetes 的套件管理器（類似於 Linux 的 apt/yum）。它將一組 Kubernetes 資源定義檔案打包為一個 **Chart**。

*   **安裝應用**：`helm install my-release bitnami/mysql`
*   **版本管理**：輕鬆回滾應用的發布版本。
*   **樣板化**：支援複雜的應用部署邏輯設定。

## Ingress - 服務的入口

Service 雖然提供了負載均衡，但通常是 4 層（TCP/UDP）。**Ingress** 提供了 7 層（HTTP/HTTPS）路由能力，充當叢集的閘道器。

*   **網域名稱路由**：基於 Host 將請求轉發不同服務 (api.example.com -> api-svc, web.example.com -> web-svc)。
*   **路徑路由**：基於 Path 將請求轉發 (/api -> api-svc, / -> web-svc)。
*   **SSL/TLS**：集中管理證書。

常見的 Ingress Controller有 Nginx Ingress Controller, Traefik, Istio Gateway 等。

## Persistent Volume (PV) 與 StorageClass

容器內的檔案是臨時的。對於有狀態應用（如數據函式庫），需要持久化儲存。

*   **PVC (Persistent Volume Claim)**：使用者申請儲存的宣告。
*   **PV (Persistent Volume)**：實際的儲存資源（NFS, AWS EBS, Ceph 等）。
*   **StorageClass**：定義儲存類，支援動態建立 PV。

## Horizontal Pod Autoscaling (HPA)

HPA 根據 CPU 利用率或其他指標（如記憶體、自定義指標）自動擴縮 Deployment 或 ReplicaSet 中的 Pod 數量。

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: php-apache
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: php-apache
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 50
```

## ConfigMap 與 Secret

*   **ConfigMap**：儲存非機密的設定資料（設定檔案、環境變數）。
*   **Secret**：儲存機密資料（密碼、Token、證書），在 Etcd 中加密儲存。

透過將設定與映象分離，保證了容器的可移植性。

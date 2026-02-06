# K3s - 輕量級 Kubernetes

[K3s](https://k3s.io/) 是一個輕量級的 Kubernetes 發行版，由 Rancher Labs 開發。它專為邊緣計算、物聯網、CI、ARM 等資源受限的環境設計。K3s 被打包為單個二進位檔案，只有不到 100MB，但透過了 CNCF 的一致性測試。

## 核心屬性

*   **輕量級**：移除過時的、非必須的 Kubernetes 功能（如傳統的雲提供商外掛），使用 SQLite 作為預設資料儲存（也支援 Etcd/MySQL/Postgres）。
*   **單一二進位**：所有元件（API Server, Controller Manager, Scheduler, Kubelet, Kube-proxy）打包在一個程序中執行。
*   **開箱即用**：內建 Helm Controller、Traefik Ingress controller、ServiceLB、Local-Path-Provisioner。
*   **安全**：預設啟用安全設定，基於 TLS 通訊。

## 安裝

### 指令碼安裝（Linux）

K3s 提供了極為便捷的安裝指令碼：

```bash
curl -sfL https://get.k3s.io | sh -
```

安裝完成後，K3s 會自動啟動並設定好 `systemd` 服務。

### 檢視狀態

```bash
sudo k3s kubectl get nodes
```

輸出類似：
```
NAME          STATUS   ROLES                  AGE   VERSION
k3s-master    Ready    control-plane,master   1m    v1.28.2+k3s1
```

## 快速使用

K3s 內建了 `kubectl` 指令（透過 `k3s kubectl` 呼叫），為了方便，通常會建立別名或設定 `KUBECONFIG`。

```bash
# 讀取 K3s 的設定檔案
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml

# 現在可以直接使用 kubectl
kubectl get pods -A
```

## 清理解除安裝

```bash
/usr/local/bin/k3s-uninstall.sh
```

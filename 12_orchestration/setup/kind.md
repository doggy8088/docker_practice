## Kind - Kubernetes IN Docker

[Kind](https://kind.sigs.k8s.io/) (Kubernetes in Docker) 是一個使用 Docker 容器作為節點執行本地 Kubernetes 叢集的工具。主要用於測試 Kubernetes 本身，也非常適合本地開發和 CI 環境。

### 為什麼選擇 Kind

Kind 相比其他本地叢集方案（如 Minikube）有以下顯著優勢：

*   **輕量便捷**：只要有 Docker 環境即可，無需額外虛擬機。
*   **多叢集支援**：可以輕鬆在本地啟動多個叢集。
*   **多版本支援**：支援指定 Kubernetes 版本進行測試。
*   **HA 支援**：支援模擬高可用叢集（多 Control Plane）。

### 安裝 Kind

Kind 是一個二進位檔案，並在 PATH 中即可使用。以下是不同系統的安裝方法。

#### macOS

執行以下指令：

```bash
brew install kind
```

#### Linux / Windows（WSL2）

可以下載二進位檔案：

```bash
## Linux AMD64

curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
```

### 建立叢集

最簡單的建立方式：

```bash
kind create cluster
```

指定叢集名稱：

```bash
kind create cluster --name my-cluster
```

### 與叢集互動

Kind 會自動將 kubeconfig 合併到 `~/.kube/config`。

```bash
kubectl cluster-info --context kind-kind
kubectl get nodes
```

### 高階用法：設定叢集

建立一個 `kind-config.yaml` 來定製叢集，例如對映連接埠到宿主機：

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  extraPortMappings:
  - containerPort: 80
    hostPort: 8080
    protocol: TCP
- role: worker
- role: worker
```

應用設定：

```bash
kind create cluster --config kind-config.yaml
```

### 刪除叢集

執行以下指令：

```bash
kind delete cluster
```

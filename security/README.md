# 安全

容器安全是生產環境部署的核心考量。評估 Docker 的安全性時，主要考慮以下幾個方面：

## 核心安全機制

* **核心命名空間（Namespace）**：提供程序、網路、檔案系統等資源的隔離
* **控制組（Cgroups）**：限制容器的 CPU、記憶體、I/O 等資源使用
* **Docker 守護程序安全**：伺服器端的訪問控制和防護
* **核心能力機制（Capabilities）**：細粒度的許可權控制

## 現代安全實踐

### 映象安全掃描

使用工具掃描映象中的已知漏洞：

* **Docker Scout**：Docker 官方整合的安全掃描工具，提供 SBOM 分析
* **Trivy**：開源的全面漏洞掃描器
* **Snyk**：商業級安全平台

```bash
# 使用 Docker Scout 掃描映象
$ docker scout cves myimage:latest

# 使用 Trivy 掃描
$ trivy image myimage:latest
```

### 非 root 使用者執行

避免以 root 使用者執行容器，降低許可權逃逸風險：

```dockerfile
FROM node:20-alpine
RUN addgroup -g 1001 appgroup && adduser -u 1001 -G appgroup -D appuser
USER appuser
```

### 只讀檔案系統

使用只讀根檔案系統增強安全性：

```bash
$ docker run --read-only --tmpfs /tmp myimage
```

### Docker Content Trust（DCT）

啟用映象簽名驗證，確保映象來源可信：

```bash
$ export DOCKER_CONTENT_TRUST=1
$ docker pull myregistry/myimage:latest
```

## 本章內容

本章將詳細介紹各安全機制的原理和設定方法。

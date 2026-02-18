## DevOps 工作流完整範例

本章將示範一個基於 Docker, Kubernetes 和 Jenkins/GitLab CI 的完整 DevOps 工作流。

### 工作流概覽

1. **Code**: 開發人員送出程式碼到 GitLab。
2. **Build**: GitLab CI 觸發建立任務。
3. **Test**: 執行單元測試和整合測試。
4. **Package**: 建立 Docker 映象並推送到 Harbor/Registry。
5. **Deploy (Staging)**: 自動部署到測試環境 Kubernetes 叢集。
6. **Verify**: 人工或自動化驗證。
7. **Release (Production)**: 審批後自動部署到生產環境。

### 關鍵設定範例

#### 1. Dockerfile 多階段建立

使用 Docker 多階段建立可以有效減小映象體積。


Dockerfile 內容如下：

```dockerfile
## Build stage

FROM golang:1.18 AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

## Final stage

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/main .
CMD ["./main"]
```

#### 2. GitLab CI 設定

GitLab CI（.gitlab-ci.yml）設定如下：


```yaml
stages:
  - test
  - build
  - deploy

unit_test:
  stage: test
  image: golang:1.18
  script:
    - go test ./...

build_image:
  stage: build
  image: docker:20.10.16
  services:
    - docker:20.10.16-dind
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

deploy_staging:
  stage: deploy
  image: dtzar/helm-kubectl
  script:
    - kubectl config set-cluster k8s --server=$KUBE_URL --insecure-skip-tls-verify=true
    - kubectl config set-credentials admin --token=$KUBE_TOKEN
    - kubectl config set-context default --cluster=k8s --user=admin
    - kubectl config use-context default
    - kubectl set image deployment/myapp myapp=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA -n staging
  only:
    - develop
```

### 最佳實踐

1. **不可變基礎設施**: 一旦映象建立完成，在各個環境（Dev, Staging, Prod）中都應該使用同一個映象 tag (通常是 commit hash)，而不是重新建立。
2. **設定分離**: 使用 ConfigMap 和 Secret 管理環境特定的設定，不要打包進映象。
3. **GitOps**: 考慮引入 ArgoCD，將部署設定也作為程式碼儲存在 Git 中，實現 Git 驅動的部署同步。

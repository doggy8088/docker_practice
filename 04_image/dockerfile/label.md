# LABEL 為映象新增元資料

## 基本語法

```docker
LABEL <key>=<value> <key>=<value> ...
```

`LABEL` 指令以鍵值對的形式給映象新增元資料。這些資料不會影響映象的功能，但可以幫助使用者理解映象，或被自動化工具使用。

---

## 為什麼需要 LABEL

1. **版本管理**：記錄版本號、建立時間、Git Commit ID
2. **聯絡訊息**：維護者郵箱、文件地址、支援渠道
3. **自動化工具**： CI/CD 工具可以讀取標籤觸發操作
4. **許可證訊息**：宣告開源協定

---

## 基本用法

### 定義單個標籤

```docker
LABEL version="1.0"
LABEL description="這是一個 Web 應用伺服器"
```

### 定義多個標籤（推薦）

```docker
LABEL maintainer="user@example.com" \
      version="1.2.0" \
      description="My App Description" \
      org.opencontainers.image.authors="Yeasy"
```

> 💡 包含空格的值需要用引號括起來。

---

## 常用標籤規範 (OCI Annotations)

為了標準和互操作性，推薦使用 [OCI Image Format Specification](https://github.com/opencontainers/image-spec/blob/main/annotations.md#pre-defined-annotation-keys) 定義的標準標籤：

| 標籤 Key | 說明 | 範例 |
|----------|------|------|
| `org.opencontainers.image.created` | 建立時間(RFC 3339) | `2024-01-01T00:00:00Z` |
| `org.opencontainers.image.authors` | 作者/維護者 | `support@example.com` |
| `org.opencontainers.image.url` | 專案首頁 | `https://example.com` |
| `org.opencontainers.image.documentation`| 文件地址 | `https://example.com/docs` |
| `org.opencontainers.image.source` | 原始碼倉庫 | `https://github.com/user/repo` |
| `org.opencontainers.image.version` | 版本號 | `1.0.0` |
| `org.opencontainers.image.licenses` | 許可證 | `MIT` |
| `org.opencontainers.image.title` | 映象標題 | `My App` |
| `org.opencontainers.image.description` | 描述 | `Production ready web server` |

### 範例

```docker
LABEL org.opencontainers.image.authors="yeasy" \
      org.opencontainers.image.documentation="https://yeasy.gitbooks.io" \
      org.opencontainers.image.source="https://github.com/yeasy/docker_practice" \
      org.opencontainers.image.licenses="MIT"
```

---

## MAINTAINER 指令（已廢棄）

舊版本的 Dockerfile 中常看到 `MAINTAINER` 指令：

```docker
# ❌ 已棄用
MAINTAINER user@example.com
```

現在推薦使用 `LABEL`：

```docker
# ✅ 推薦
LABEL maintainer="user@example.com"
# 或
LABEL org.opencontainers.image.authors="user@example.com"
```

---

## 動態標籤

配合 `ARG` 使用，可以在建立時動態注入標籤：

```docker
ARG BUILD_DATE
ARG VCS_REF

LABEL org.opencontainers.image.created=$BUILD_DATE \
      org.opencontainers.image.revision=$VCS_REF
```

建立指令：

```bash
$ docker build \
  --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
  --build-arg VCS_REF=$(git rev-parse --short HEAD) \
  .
```

---

## 檢視標籤

### docker inspect

檢視映象的標籤訊息：

```bash
$ docker inspect nginx --format '{{json .Config.Labels}}' | jq
{
  "maintainer": "NGINX Docker Maintainers <docker-maint@nginx.com>"
}
```

### 過濾器

可以使用標籤過濾映象：

```bash
# 列出作者是 yeasy 的所有映象
$ docker images --filter "label=org.opencontainers.image.authors=yeasy"

# 刪除所有帶有特定標籤的映象
$ docker rmi $(docker images -q --filter "label=stage=builder")
```

---

## 本章小結

| 要點 | 說明 |
|------|------|
| **作用** | 新增 key-value 元資料 |
| **語法** | `LABEL k=v k=v ...` |
| **規範** | 推薦使用 OCI 標準標籤 |
| **棄用** | 不要再使用 `MAINTAINER` |
| **檢視** | `docker inspect` |

## 延伸閱讀

- [OCI 標籤規範](https://github.com/opencontainers/image-spec/blob/main/annotations.md)
- [Dockerfile 最佳實踐](../../15_appendix/best_practices.md)

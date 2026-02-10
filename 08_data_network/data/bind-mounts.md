## 掛載主機目錄

### 什麼是繫結掛載

Bind Mount（繫結掛載）將**宿主機的目錄或檔案**直接掛載到容器中。容器可以讀寫宿主機的檔案系統。

```
宿主機                           容器
┌─────────────────────┐         ┌─────────────────────┐
│  /home/user/code/   │         │                     │
│  ├── index.html     │◄───────►│  /usr/share/nginx/  │
│  ├── style.css      │ Bind    │  html/              │
│  └── app.js         │ Mount   │  (同一份檔案)        │
└─────────────────────┘         └─────────────────────┘
```

---

### Bind Mount vs Volume

| 屬性 | Bind Mount | Volume |
|------|------------|--------|
| **資料位置** | 宿主機任意路徑 | Docker 管理的目錄 |
| **路徑指定** | 必須是絕對路徑 | 卷名 |
| **可移植性** | 依賴宿主機路徑 | 更好（Docker 管理） |
| **效能** | 依賴宿主機檔案系統 | 最佳化的儲存驅動 |
| **適用場景** | 開發環境、設定檔案 | 生產資料持久化 |
| **備份** | 直接訪問檔案 | 需要透過 Docker |

#### 選擇建議

具體內容如下：

```
需求                          推薦方案
─────────────────────────────────────────
開發時同步程式碼              → Bind Mount
持久化資料庫資料            → Volume
共享設定檔案                → Bind Mount
容器間共享資料              → Volume
備份方便                    → Bind Mount（直接訪問）
生產環境                    → Volume
```

---

### 基本語法

#### 使用 --mount（推薦）

執行以下指令：

```bash
$ docker run -d \
    --mount type=bind,source=/宿主機路徑,target=/容器路徑 \
    nginx
```

#### 使用 -v（簡寫）

執行以下指令：

```bash
$ docker run -d \
    -v /宿主機路徑:/容器路徑 \
    nginx
```

#### 兩種語法對比

| 屬性 | --mount | -v |
|------|---------|-----|
| 語法 | 鍵值對，更清晰 | 冒號分隔，更簡潔 |
| 路徑不存在時 | 報錯 | 自動建立目錄 |
| 推薦程度 | ✅ 推薦 | 常用 |

---

### 使用場景

#### 場景一：開發環境程式碼同步

執行以下指令：

```bash
## 將本地程式碼目錄掛載到容器

$ docker run -d \
    -p 8080:80 \
    --mount type=bind,source=$(pwd)/src,target=/usr/share/nginx/html \
    nginx

## 修改本地檔案，容器內立即生效（熱更新）

$ echo "Hello" > src/index.html
## 瀏覽器重新整理即可看到變化

具體內容如下：

```

#### 場景二：設定檔案掛載

執行以下指令：

```bash
## 掛載自定義 nginx 設定

$ docker run -d \
    --mount type=bind,source=/path/to/nginx.conf,target=/etc/nginx/nginx.conf,readonly \
    nginx
```

#### 場景三：日誌收集

執行以下指令：

```bash
## 將容器日誌輸出到宿主機目錄

$ docker run -d \
    --mount type=bind,source=/var/log/myapp,target=/app/logs \
    myapp
```

#### 場景四：共享 SSH 金鑰

執行以下指令：

```bash
## 掛載 SSH 金鑰（只讀）

$ docker run --rm -it \
    --mount type=bind,source=$HOME/.ssh,target=/root/.ssh,readonly \
    alpine ssh user@remote
```

---

### 只讀掛載

防止容器修改宿主機檔案：

```bash
## --mount 語法

$ docker run -d \
    --mount type=bind,source=/config,target=/app/config,readonly \
    myapp

## -v 語法

$ docker run -d \
    -v /config:/app/config:ro \
    myapp
```

容器內嘗試寫入會報錯：

```bash
$ touch /app/config/new.txt
touch: /app/config/new.txt: Read-only file system
```

---

### 掛載單個檔案

執行以下指令：

```bash
## 掛載 bash 歷史記錄

$ docker run --rm -it \
    --mount type=bind,source=$HOME/.bash_history,target=/root/.bash_history \
    ubuntu bash

## 掛載自定義設定檔案

$ docker run -d \
    --mount type=bind,source=/path/to/my.cnf,target=/etc/mysql/my.cnf \
    mysql
```

> ⚠️ **注意**：掛載單個檔案時，如果宿主機上的檔案被編輯器替換（而非原地修改），容器內仍是舊檔案的 inode。建議重啟容器或掛載目錄。

---

### 檢視掛載訊息

執行以下指令：

```bash
$ docker inspect mycontainer --format '{{json .Mounts}}' | jq
```

輸出：

```json
[
  {
    "Type": "bind",
    "Source": "/home/user/code",
    "Destination": "/app",
    "Mode": "",
    "RW": true,
    "Propagation": "rprivate"
  }
]
```

| 欄位 | 說明 |
|------|------|
| `Type` | 掛載型別（bind） |
| `Source` | 宿主機路徑 |
| `Destination` | 容器內路徑 |
| `RW` | 是否可讀寫 |
| `Propagation` | 掛載傳播模式 |

---

### 常見問題

#### Q: 路徑不存在報錯

執行以下指令：

```bash
$ docker run --mount type=bind,source=/not/exist,target=/app nginx
docker: Error response from daemon: invalid mount config for type "bind": 
bind source path does not exist: /not/exist
```

**解決**：確保源路徑存在，或改用 `-v`（會自動建立）

#### Q: 許可權問題

容器內用戶可能無權訪問掛載的檔案：

```bash
## 方法1：確保宿主機檔案許可權允許容器使用者訪問

$ chmod -R 755 /path/to/data

## 方法2：以 root 執行容器

$ docker run -u root ...

## 方法3：使用相同的 UID

$ docker run -u $(id -u):$(id -g) ...
```

#### Q: macOS/Windows 效能問題

在 Docker Desktop 上，Bind Mount 效能較差（需要跨檔案系統同步）：

```bash
## 使用 :cached 或 :delegated 提高效能（macOS）

$ docker run -v /host/path:/container/path:cached myapp
```

| 選項 | 說明 |
|------|------|
| `:cached` | 宿主機權威，容器讀取可能延遲 |
| `:delegated` | 容器權威，宿主機讀取可能延遲 |
| `:consistent` | 預設，完全一致（最慢） |

---

### 最佳實踐

#### 1. 開發環境使用 Bind Mount

執行以下指令：

```bash
## 程式碼熱更新

$ docker run -v $(pwd):/app -p 3000:3000 node npm run dev
```

#### 2. 生產環境使用 Volume

執行以下指令：

```bash
## 資料持久化

$ docker run -v mysql_data:/var/lib/mysql mysql
```

#### 3. 設定檔案使用只讀掛載

執行以下指令：

```bash
$ docker run -v /config/nginx.conf:/etc/nginx/nginx.conf:ro nginx
```

#### 4. 注意路徑安全

執行以下指令：

```bash
## ❌ 危險：掛載根目錄或敏感目錄

$ docker run -v /:/host ...

## ✅ 只掛載必要的目錄

$ docker run -v /app/data:/data ...
```

---

### 本章小結

| 要點 | 說明 |
|------|------|
| **作用** | 將宿主機目錄掛載到容器 |
| **語法** | `-v /宿主機:/容器` 或 `--mount type=bind,...` |
| **只讀** | 新增 `readonly` 或 `:ro` |
| **適用場景** | 開發環境、設定檔案、日誌 |
| **vs Volume** | Bind 更靈活，Volume 更適合生產 |

### 延伸閱讀

- [資料卷](volume.md)：Docker 管理的持久化儲存
- [tmpfs 掛載](tmpfs.md)：記憶體臨時儲存
- [Compose 資料管理](../compose/10.5_compose_file.md)：Compose 中的掛載設定

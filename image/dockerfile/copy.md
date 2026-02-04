# COPY 複製檔案

## 基本語法

```docker
COPY [選項] <源路徑>... <目標路徑>
COPY [選項] ["<源路徑1>", "<源路徑2>", ... "<目標路徑>"]
```

`COPY` 指令將建立上下文中的檔案或目錄複製到映象內。

---

## 基本用法

### 複製單個檔案

```docker
# 複製檔案到指定目錄
COPY package.json /app/

# 複製檔案並重命名
COPY config.json /app/settings.json
```

### 複製多個檔案

```docker
# 複製多個指定檔案
COPY package.json package-lock.json /app/

# 使用萬用字元
COPY *.json /app/
COPY src/*.js /app/src/
```

### 複製目錄

```docker
# 複製整個目錄的內容（不是目錄本身）
COPY src/ /app/src/
```

> ⚠️ **注意**：複製目錄時，複製的是目錄的**內容**，不包含目錄本身。

```
建立上下文：              映象內：
src/                     /app/src/
├── index.js      →      ├── index.js
└── utils.js             └── utils.js
```

---

## 萬用字元規則

COPY 支援 Go 的 `filepath.Match` 萬用字元規則：

| 萬用字元 | 說明 | 範例 |
|--------|------|------|
| `*` | 對應任意字元序列 | `*.json` |
| `?` | 對應單個字元 | `config?.json` |
| `[abc]` | 對應括號內任一字元 | `[abc].txt` |
| `[a-z]` | 對應範圍內字元 | `file[0-9].txt` |

```docker
COPY hom* /mydir/       # home.txt, homework.md 等
COPY hom?.txt /mydir/   # home.txt, homy.txt 等
COPY app[0-9].js /app/  # app0.js ~ app9.js
```

---

## 目標路徑

### 絕對路徑

```docker
COPY app.js /usr/src/app/
```

### 相對路徑（基於 WORKDIR）

```docker
WORKDIR /app
COPY package.json ./        # 複製到 /app/package.json
COPY src/ ./src/            # 複製到 /app/src/
```

### 自動建立目錄

如果目標目錄不存在，Docker 會自動建立：

```docker
# /app/config/ 不存在也會自動建立
COPY settings.json /app/config/
```

---

## 修改檔案所有者

使用 `--chown` 選項設定檔案的使用者和組：

```docker
# 使用使用者名和組名
COPY --chown=node:node package.json /app/

# 使用 UID 和 GID
COPY --chown=1000:1000 . /app/

# 只指定使用者
COPY --chown=node . /app/
```

> 💡 結合 `USER` 指令使用，確保應用以非 root 使用者執行。

---

## 保留檔案元資料

COPY 會保留源檔案的元資料：
- 讀、寫、執行許可權
- 修改時間

這對於指令碼檔案特別重要：

```docker
# start.sh 的可執行許可權會被保留
COPY start.sh /app/
```

---

## COPY vs ADD

| 屬性 | COPY | ADD |
|------|------|-----|
| 複製本地檔案 | ✅ | ✅ |
| 自動解壓 tar | ❌ | ✅ |
| 支援 URL | ❌ | ✅（不推薦） |
| 推薦程度 | ✅ **推薦** | ⚠️ 特殊場景使用 |

```docker
# 推薦：使用 COPY
COPY app.tar.gz /app/
RUN tar -xzf /app/app.tar.gz

# ADD 會自動解壓（行為不明顯，不推薦）
ADD app.tar.gz /app/
```

> 筆者建議：除非需要自動解壓 tar 檔案，否則始終使用 COPY。明確的行為比隱式的魔法更好。

---

## 多階段建立中的 COPY

### 從其他建立階段複製

```docker
# 建立階段
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 生產階段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

### 使用 --link 最佳化快取（BuildKit）

```docker
# 使用 --link 後，檔案以獨立層新增，不依賴前序指令
COPY --link --from=builder /app/dist /usr/share/nginx/html
```

`--link` 的優勢：
- 更高效利用建立快取
- 並行化建立過程
- 加速多階段建立

---

## .dockerignore

使用 `.dockerignore` 排除不需要複製的檔案：

```gitignore
# .dockerignore
node_modules
.git
.env
*.log
Dockerfile
.dockerignore
```

這可以：
- 減小建立上下文大小
- 加速建立
- 避免複製敏感檔案

---

## 最佳實踐

### 1. 利用快取，先複製依賴檔案

```docker
# ✅ 好：先複製依賴定義，再安裝，最後複製程式碼
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# ❌ 差：一次性複製所有檔案，程式碼變更會導致重新 npm install
COPY . .
RUN npm install
```

### 2. 使用 .dockerignore

```docker
# 確保 node_modules 不被複製
COPY . .
# .dockerignore 中應包含 node_modules
```

### 3. 明確複製路徑

```docker
# ✅ 好：明確的路徑
COPY src/ /app/src/
COPY package.json /app/

# ❌ 差：過於寬泛
COPY . .
```

---

## 本章小結

| 操作 | 範例 |
|------|------|
| 複製檔案 | `COPY app.js /app/` |
| 複製多個檔案 | `COPY *.json /app/` |
| 複製目錄內容 | `COPY src/ /app/src/` |
| 修改所有者 | `COPY --chown=node:node . /app/` |
| 從建立階段複製 | `COPY --from=builder /app/dist ./` |

## 延伸閱讀

- [ADD 指令](add.md)：複製和解壓
- [WORKDIR 指令](workdir.md)：設定工作目錄
- [多階段建立](../multistage-builds.md)：最佳化映象大小
- [最佳實踐](../../appendix/best_practices.md)：Dockerfile 編寫指南

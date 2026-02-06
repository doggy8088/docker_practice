# 使用 Rails

> 本小節內容適合 Ruby 開發人員閱讀。

本節使用 Docker Compose 設定並執行一個 **Rails + PostgreSQL** 應用。

## 架構概覽

```
┌─────────────────────────────────────────────────────────────┐
│                     Docker Compose 網路                     │
│                                                             │
│  ┌─────────────────────┐      ┌─────────────────────┐       │
│  │     web 服務         │      │      db 服務        │       │
│  │  ┌───────────────┐  │      │  ┌───────────────┐  │       │
│  │  │   Rails       │  │──────│  │  PostgreSQL   │  │       │
│  │  │   應用        │  │ :5432│  │   資料庫      │  │       │
│  │  └───────────────┘  │      │  └───────────────┘  │       │
│  │       :3000         │      │                     │       │
│  └──────────┬──────────┘      └─────────────────────┘       │
│             │                                               │
└─────────────┼───────────────────────────────────────────────┘
              │
              ▼
         localhost:3000
```

## 準備工作

建立專案目錄：

```bash
$ mkdir rails-docker && cd rails-docker
```

需要建立三個檔案：`Dockerfile`、`Gemfile` 和 `docker-compose.yml`。

## Step 1: 建立 Dockerfile

```docker
FROM ruby:3.2

# 安裝系統依賴
RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev nodejs && \
    rm -rf /var/lib/apt/lists/*

# 設定工作目錄
WORKDIR /myapp

# 先複製 Gemfile，利用快取加速建立
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install

# 複製應用程式碼
COPY . /myapp
```

**設定說明**：

| 指令 | 作用 |
|------|------|
| `build-essential` | 編譯原生擴充套件所需 |
| `libpq-dev` | PostgreSQL 用戶端函式庫 |
| `nodejs` | Rails Asset Pipeline 需要 |
| 先複製 Gemfile | 只有依賴變化時才重新 `bundle install` |

## Step 2: 建立 Gemfile

建立一個初始的 `Gemfile`，稍後會被 `rails new` 覆蓋：

```ruby
source 'https://rubygems.org'
gem 'rails', '~> 7.1'
```

建立空的 `Gemfile.lock`：

```bash
$ touch Gemfile.lock
```

## Step 3: 建立 docker-compose.yml

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  web:
    build: .
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
    volumes:
      - .:/myapp
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://postgres:password@db:5432/myapp_development

volumes:
  postgres_data:
```

**設定詳解**：

| 設定項 | 說明 |
|--------|------|
| `rm -f tmp/pids/server.pid` | 清理上次異常退出留下的 PID 檔案 |
| `volumes: .:/myapp` | 掛載程式碼目錄，支援熱更新 |
| `depends_on: db` | 確保資料庫先啟動 |
| `DATABASE_URL` | Rails 12-factor 風格的資料庫設定 |

## Step 4: 生成 Rails 專案

使用 `docker compose run` 生成專案骨架：

```bash
$ docker compose run --rm web rails new . --force --database=postgresql --skip-bundle
```

**指令解釋**：
- `--rm`：執行後刪除臨時容器
- `--force`：覆蓋已存在的檔案
- `--database=postgresql`：設定使用 PostgreSQL
- `--skip-bundle`：暫不安裝依賴（稍後統一安裝）

生成的目錄結構：

```bash
$ ls
Dockerfile       Gemfile          Rakefile         config           lib              tmp
Gemfile.lock     README.md        app              config.ru        log              vendor
docker-compose.yml                bin              db               public
```

> ⚠️ **Linux 使用者**：如遇許可權問題，執行 `sudo chown -R $USER:$USER .`

## Step 5: 重新建立映象

由於生成了新的 Gemfile，需要重新建立映象以安裝完整依賴：

```bash
$ docker compose build
```

## Step 6: 設定資料庫連線

修改 `config/database.yml`：

```yaml
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  url: <%= ENV['DATABASE_URL'] %>

development:
  <<: *default

test:
  <<: *default
  database: myapp_test

production:
  <<: *default
```

> 💡 使用 `DATABASE_URL` 環境變數設定資料庫，符合 12-factor 應用原則，便於在不同環境間切換。

## Step 7: 啟動應用

```bash
$ docker compose up
```

輸出範例：

```
db-1   | PostgreSQL init process complete; ready for start up.
db-1   | LOG:  database system is ready to accept connections
web-1  | => Booting Puma
web-1  | => Rails 7.1.0 application starting in development
web-1  | => Run `bin/rails server --help` for more startup options
web-1  | Puma starting in single mode...
web-1  | * Listening on http://0.0.0.0:3000
```

## Step 8: 建立資料庫

在另一個終端執行：

```bash
$ docker compose exec web rails db:create
Created database 'myapp_development'
Created database 'myapp_test'
```

訪問 http://localhost:3000 檢視 Rails 歡迎頁面。

## 常用開發指令

```bash
# 資料庫遷移
$ docker compose exec web rails db:migrate

# Rails 控制台
$ docker compose exec web rails console

# 執行測試
$ docker compose exec web rails test

# 生成腳手架
$ docker compose exec web rails generate scaffold Post title:string body:text

# 進入容器 Shell
$ docker compose exec web bash
```

## 常見問題

### Q: 資料庫連線失敗

檢查 `DATABASE_URL` 環境變數格式是否正確，確保 db 服務已啟動：

```bash
$ docker compose ps
$ docker compose logs db
```

### Q: server.pid 檔案導致啟動失敗

錯誤訊息：`A server is already running`

已在 command 中新增 `rm -f tmp/pids/server.pid` 處理。如仍有問題：

```bash
$ docker compose exec web rm -f tmp/pids/server.pid
```

### Q: Gem 安裝失敗

可能需要更新 bundler 或清理快取：

```bash
$ docker compose run --rm web bundle update
```

## 開發 vs 生產

| 設定項 | 開發環境 | 生產環境 |
|--------|---------|---------|
| Rails 伺服器 | Puma (開發模式) | Puma + Nginx |
| 程式碼掛載 | 使用 volumes | 程式碼打包進映象 |
| 靜態資源 | 動態編譯 | 預編譯 (`rails assets:precompile`) |
| 資料庫密碼 | 明文設定 | 使用 Secrets 管理 |

## 延伸閱讀

- [使用 Django](django.md)：Python Web 框架實戰
- [Compose 樣板檔案](compose_file.md)：設定詳解
- [資料管理](../07_data_network/README.md)：資料持久化

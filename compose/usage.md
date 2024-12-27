# 使用

## 術語

首先介紹幾個術語。

* 服務 (`service`)：一個應用容器，實際上可以執行多個相同映象的實例。

* 專案 (`project`)：由一組關聯的應用容器組成的一個完整業務單元。

可見，一個專案可以由多個服務（容器）關聯而成，`Compose` 面向專案進行管理。

## 場景

最常見的專案是 web 網站，該專案應該包含 web 應用和緩存。

下面我們用 `Python` 來建立一個能夠記錄頁面訪問次數的 web 網站。

### web 應用

新建資料夾，在該目錄中編寫 `app.py` 檔案

```python
from flask import Flask
from redis import Redis

app = Flask(__name__)
redis = Redis(host='redis', port=6379)

@app.route('/')
def hello():
    count = redis.incr('hits')
    return 'Hello World! 該頁面已被訪問 {} 次。\n'.format(count)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
```

### Dockerfile

編寫 `Dockerfile` 檔案，內容為

```docker
FROM python:3.6-alpine
ADD . /code
WORKDIR /code
RUN pip install redis flask
CMD ["python", "app.py"]
```

### docker-compose.yml

編寫 `docker-compose.yml` 檔案，這個是 Compose 使用的主樣板檔案。

```yaml
version: '3'
services:

  web:
    build: .
    ports:
     - "5000:5000"

  redis:
    image: "redis:alpine"
```

### 執行 compose 專案

```bash
$ docker-compose up
```

此時訪問本地 `5000` 連接埠，每次重新整理頁面，計數就會加 1。

# 使用 Django

> 本小節內容適合 `Python` 開發人員閱讀。

我們現在將使用 `Docker Compose` 設定並執行一個 `Django/PostgreSQL` 應用。

在一切工作開始前，需要先編輯好三個必要的檔案。

第一步，因為應用將要執行在一個滿足所有環境依賴的 Docker 容器裡面，那麼我們可以透過編輯 `Dockerfile` 檔案來指定 Docker 容器要安裝內容。內容如下：

```docker
FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
```

以上內容指定應用將使用安裝了 Python 以及必要依賴套件的映象。更多關於如何編寫 `Dockerfile` 檔案的訊息可以檢視 [ Dockerfile 使用](../image/dockerfile/README.md)。

第二步，在 `requirements.txt` 檔案裡面寫明需要安裝的具體依賴套件名。

```bash
Django>=2.0,<3.0
psycopg2>=2.7,<3.0
```

第三步，`docker-compose.yml` 檔案將把所有的東西關聯起來。它描述了應用的構成（一個 web 服務和一個資料庫）、使用的 Docker 映象、映象之間的連線、掛載到容器的卷，以及服務開放的連接埠。

```yaml
version: "3"
services:

  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: 'postgres'

  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/code
    ports:
      - "8000:8000"
```

檢視 [`docker-compose.yml` 章節](compose_file.md) 瞭解更多詳細的工作機制。

現在我們就可以使用 `docker-compose run` 指令啟動一個 `Django` 應用了。

```bash
$ docker-compose run web django-admin startproject django_example .
```

由於 web 服務所使用的映象並不存在，所以 Compose 會首先使用 `Dockerfile` 為 web 服務建立一個映象，接著使用這個映象在容器裡執行 `django-admin startproject django_example` 指令。

這將在當前目錄生成一個 `Django` 應用。

```bash
$ ls
Dockerfile       docker-compose.yml          django_example       manage.py       requirements.txt
```

如果你的系統是 Linux,記得更改檔案許可權。

```bash
$ sudo chown -R $USER:$USER .
```

首先，我們要為應用設定好資料庫的連線訊息。用以下內容替換 `django_example/settings.py` 檔案中 `DATABASES = ...` 定義的節點內容。

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'HOST': 'db',
        'PORT': 5432,
        'PASSWORD': 'postgres',
    }
}
```

這些訊息是在 [postgres](https://hub.docker.com/_/postgres/) 映象固定設定好的。然後，執行 `docker-compose up` ：

```bash
$ docker-compose up

django_db_1 is up-to-date
Creating django_web_1 ...
Creating django_web_1 ... done
Attaching to django_db_1, django_web_1
db_1   | The files belonging to this database system will be owned by user "postgres".
db_1   | This user must also own the server process.
db_1   |
db_1   | The database cluster will be initialized with locale "en_US.utf8".
db_1   | The default database encoding has accordingly been set to "UTF8".
db_1   | The default text search configuration will be set to "english".

web_1  | Performing system checks...
web_1  |
web_1  | System check identified no issues (0 silenced).
web_1  |
web_1  | November 23, 2017 - 06:21:19
web_1  | Django version 1.11.7, using settings 'django_example.settings'
web_1  | Starting development server at http://0.0.0.0:8000/
web_1  | Quit the server with CONTROL-C.
```

這個 `Django` 應用已經開始在你的 Docker 守護程序裡監聽著 `8000` 連接埠了。開啟 `127.0.0.1:8000` 即可看到 `Django` 歡迎頁面。

你還可以在 Docker 上執行其它的管理指令，例如對於同步資料庫結構這種事，在執行完 `docker-compose up` 後，在另外一個終端進入資料夾執行以下指令即可：

```bash
$ docker-compose run web python manage.py syncdb
```

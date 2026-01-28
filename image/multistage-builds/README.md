# 多階段建立

## 之前的做法

在 Docker 17.05 版本之前，我們建立 Docker 映象時，通常會採用兩種方式：

### 全部放入一個 Dockerfile

一種方式是將所有的建立過程編包含在一個 `Dockerfile` 中，包括專案及其依賴庫的編譯、測試、打包等流程，這裡可能會帶來的一些問題：

  * 映象層次多，映象體積較大，部署時間變長

  * 原始碼存在洩露的風險

例如，編寫 `app.go` 檔案，該程式輸出 `Hello World!`

```go
package main

import "fmt"

func main(){
    fmt.Printf("Hello World!");
}
```

編寫 `Dockerfile.one` 檔案

```docker
FROM golang:alpine

RUN apk --no-cache add git ca-certificates

WORKDIR /go/src/github.com/go/helloworld/

COPY app.go .

RUN go mod init helloworld \
  && go get -d -v github.com/go-sql-driver/mysql \
  && CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app . \
  && cp /go/src/github.com/go/helloworld/app /root

WORKDIR /root/

CMD ["./app"]
```

建立映象

```bash
$ docker build -t go/helloworld:1 -f Dockerfile.one .
```

### 分散到多個 Dockerfile

另一種方式，就是我們事先在一個 `Dockerfile` 將專案及其依賴庫編譯測試打包好後，再將其複製到執行環境中，這種方式需要我們編寫兩個 `Dockerfile` 和一些編譯指令碼才能將其兩個階段自動整合起來，這種方式雖然可以很好地規避第一種方式存在的風險，但明顯部署過程較複雜。

例如，編寫 `Dockerfile.build` 檔案

```docker
FROM golang:alpine

RUN apk --no-cache add git

WORKDIR /go/src/github.com/go/helloworld

COPY app.go .

RUN go get -d -v github.com/go-sql-driver/mysql \
  && CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .
```

編寫 `Dockerfile.copy` 檔案

```docker
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY app .

CMD ["./app"]
```

新建 `build.sh`

```bash
#!/bin/sh
echo Building go/helloworld:build

docker build -t go/helloworld:build . -f Dockerfile.build

docker create --name extract go/helloworld:build
docker cp extract:/go/src/github.com/go/helloworld/app ./app
docker rm -f extract

echo Building go/helloworld:2

docker build --no-cache -t go/helloworld:2 . -f Dockerfile.copy
rm ./app
```

現在執行指令碼即可建立映象

```bash
$ chmod +x build.sh

$ ./build.sh
```

對比兩種方式生成的映象大小

```bash
$ docker image ls

REPOSITORY      TAG    IMAGE ID        CREATED         SIZE
go/helloworld   2      f7cf3465432c    22 seconds ago  6.47MB
go/helloworld   1      f55d3e16affc    2 minutes ago   295MB
```

## 使用多階段建立

為解決以上問題，Docker v17.05 開始支援多階段建立 (`multistage builds`)。使用多階段建立我們就可以很容易解決前面提到的問題，並且只需要編寫一個 `Dockerfile`：

例如，編寫 `Dockerfile` 檔案

```docker
FROM golang:alpine as builder

RUN apk --no-cache add git

WORKDIR /go/src/github.com/go/helloworld/

RUN go get -d -v github.com/go-sql-driver/mysql

COPY app.go .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

FROM alpine:latest as prod

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=0 /go/src/github.com/go/helloworld/app .

CMD ["./app"]
```

建立映象

```bash
$ docker build -t go/helloworld:3 .
```

對比三個映象大小

```bash
$ docker image ls

REPOSITORY        TAG   IMAGE ID         CREATED            SIZE
go/helloworld     3     d6911ed9c846     7 seconds ago      6.47MB
go/helloworld     2     f7cf3465432c     22 seconds ago     6.47MB
go/helloworld     1     f55d3e16affc     2 minutes ago      295MB
```

很明顯使用多階段建立的映象體積小，同時也完美解決了上邊提到的問題。

### 只建立某一階段的映象

我們可以使用 `as` 來為某一階段命名，例如

```docker
FROM golang:alpine as builder
```

例如當我們只想建立 `builder` 階段的映象時，增加 `--target=builder` 引數即可

```bash
$ docker build --target builder -t username/imagename:tag .
```

### 建立時從其他映象複製檔案

上面例子中我們使用 `COPY --from=0 /go/src/github.com/go/helloworld/app .` 從上一階段的映象中複製檔案，我們也可以複製任意映象中的檔案。

```docker
$ COPY --from=nginx:latest /etc/nginx/nginx.conf /nginx.conf
```

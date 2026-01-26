# 後台執行

更多的時候，需要讓 Docker 在後台執行而不是直接把執行指令的結果輸出在當前宿主機下。此時，可以透過新增 `-d` 引數來實現。

下面舉兩個例子來說明一下。

如果不使用 `-d` 引數執行容器。

```bash
$ docker run ubuntu:24.04 /bin/sh -c "while true; do echo hello world; sleep 1; done"
hello world
hello world
hello world
hello world
```

容器會把輸出的結果 (STDOUT) 列印到宿主機上面

如果使用了 `-d` 引數執行容器。

```bash
$ docker run -d ubuntu:24.04 /bin/sh -c "while true; do echo hello world; sleep 1; done"
77b2dc01fe0f3f1265df143181e7b9af5e05279a884f4776ee75350ea9d8017a
```

此時容器會在後台執行並不會把輸出的結果 (STDOUT) 列印到宿主機上面(輸出結果可以用 `docker logs` 檢視)。

**注：** 容器是否會長久執行，是和 `docker run` 指定的指令有關，和 `-d` 引數無關。

使用 `-d` 引數啟動後會回傳一個唯一的 id，也可以透過 `docker container ls` 指令來檢視容器訊息。

```
$ docker container ls
CONTAINER ID  IMAGE         COMMAND               CREATED        STATUS       PORTS NAMES
77b2dc01fe0f  ubuntu:24.04  /bin/sh -c 'while tr  2 minutes ago  Up 1 minute        agitated_wright
```

要獲取容器的輸出訊息，可以透過 `docker container logs` 指令。

```bash
$ docker container logs [container ID or NAMES]
hello world
hello world
hello world
. . .
```

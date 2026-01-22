# 刪除容器

可以使用 `docker container rm` 來刪除一個處於終止狀態的容器。例如

```bash
$ docker container rm trusting_newton
trusting_newton
```

如果要刪除一個執行中的容器，可以新增 `-f` 引數。Docker 會發送 `SIGKILL` 訊號給容器。

# 清理所有處於終止狀態的容器

用 `docker container ls -a` 指令可以檢視所有已經建立的包括終止狀態的容器，如果數量太多要一個個刪除可能會很麻煩，用下面的指令可以清理掉所有處於終止狀態的容器。

```bash
$ docker container prune
```

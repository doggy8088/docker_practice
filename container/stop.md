# 終止容器

可以使用 `docker container stop` 來終止一個執行中的容器。

此外，當 Docker 容器中指定的應用終結時，容器也自動終止。

例如對於上一章節中只啟動了一個終端的容器，使用者透過 `exit` 指令或 `Ctrl+d` 來退出終端時，所建立的容器立刻終止。

終止狀態的容器可以用 `docker container ls -a` 指令看到。例如

```bash
$ docker container ls -a
CONTAINER ID        IMAGE                    COMMAND                CREATED             STATUS                          PORTS               NAMES
ba267838cc1b        ubuntu:18.04             "/bin/bash"            30 minutes ago      Exited (0) About a minute ago                       trusting_newton
```

處於終止狀態的容器，可以透過 `docker container start` 指令來重新啟動。

此外，`docker container restart` 指令會將一個執行態的容器終止，然後再重新啟動它。

# 進入容器

在使用 `-d` 引數時，容器啟動後會進入後台。

某些時候需要進入容器進行操作，包括使用 `docker attach` 指令或 `docker exec` 指令，推薦大家使用 `docker exec` 指令，原因會在下面說明。

## `attach` 指令

下面範例如何使用 `docker attach` 指令。

```bash
$ docker run -dit ubuntu
243c32535da7d142fb0e6df616a3c3ada0b8ab417937c853a9e1c251f499f550

$ docker container ls
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
243c32535da7        ubuntu:latest       "/bin/bash"         18 seconds ago      Up 17 seconds                           nostalgic_hypatia

$ docker attach 243c
root@243c32535da7:/#
```

*注意：* 如果從這個 stdin 中 exit，會導致容器的停止。

## `exec` 指令

### `-i` `-t` 引數

`docker exec` 後邊可以跟多個引數，這裡主要說明 `-i` `-t` 引數。

只用 `-i` 引數時，由於沒有分配偽終端，介面沒有我們熟悉的 Linux 指令提示符，但指令執行結果仍然可以回傳。

當 `-i` `-t` 引數一起使用時，則可以看到我們熟悉的 Linux 指令提示符。

```bash
$ docker run -dit ubuntu
69d137adef7a8a689cbcb059e94da5489d3cddd240ff675c640c8d96e84fe1f6

$ docker container ls
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
69d137adef7a        ubuntu:latest       "/bin/bash"         18 seconds ago      Up 17 seconds                           zealous_swirles

$ docker exec -i 69d1 bash
ls
bin
boot
dev
...

$ docker exec -it 69d1 bash
root@69d137adef7a:/#
```

如果從這個 stdin 中 exit，不會導致容器的停止。這就是為什麼推薦大家使用 `docker exec` 的原因。

更多引數說明請使用 `docker exec --help` 檢視。

# SHELL 指令

格式：`SHELL ["executable", "parameters"]`

`SHELL` 指令可以指定 `RUN` `ENTRYPOINT` `CMD` 指令的 shell，Linux 中預設為 `["/bin/sh", "-c"]`

```docker
SHELL ["/bin/sh", "-c"]

RUN lll ; ls

SHELL ["/bin/sh", "-cex"]

RUN lll ; ls
```

兩個 `RUN` 執行同一指令，第二個 `RUN` 執行的指令會列印出每條指令並當遇到錯誤時退出。

當 `ENTRYPOINT` `CMD` 以 shell 格式指定時，`SHELL` 指令所指定的 shell 也會成為這兩個指令的 shell

```docker
SHELL ["/bin/sh", "-cex"]

# /bin/sh -cex "nginx"
ENTRYPOINT nginx
```

```docker
SHELL ["/bin/sh", "-cex"]

# /bin/sh -cex "nginx"
CMD nginx
```

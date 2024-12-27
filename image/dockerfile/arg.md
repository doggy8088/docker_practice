# ARG 建立引數

格式：`ARG <引數名>[=<預設值>]`

建立引數和 `ENV` 的效果一樣，都是設定環境變數。所不同的是，`ARG` 所設定的建立環境的環境變數，在將來容器執行時是不會存在這些環境變數的。但是不要因此就使用 `ARG` 儲存密碼之類的訊息，因為 `docker history` 還是可以看到所有值的。

`Dockerfile` 中的 `ARG` 指令是定義引數名稱，以及定義其預設值。該預設值可以在建立指令 `docker build` 中用 `--build-arg <引數名>=<值>` 來覆蓋。

靈活的使用 `ARG` 指令，能夠在不修改 Dockerfile 的情況下，建立出不同的映象。

ARG 指令有生效範圍，如果在 `FROM` 指令之前指定，那麼只能用於 `FROM` 指令中。

```docker
ARG DOCKER_USERNAME=library

FROM ${DOCKER_USERNAME}/alpine

RUN set -x ; echo ${DOCKER_USERNAME}
```

使用上述 Dockerfile 會發現無法輸出 `${DOCKER_USERNAME}` 變數的值，要想正常輸出，你必須在 `FROM` 之後再次指定 `ARG`

```docker
# 只在 FROM 中生效
ARG DOCKER_USERNAME=library

FROM ${DOCKER_USERNAME}/alpine

# 要想在 FROM 之後使用，必須再次指定
ARG DOCKER_USERNAME=library

RUN set -x ; echo ${DOCKER_USERNAME}
```

對於多階段建立，尤其要注意這個問題

```docker
# 這個變數在每個 FROM 中都生效
ARG DOCKER_USERNAME=library

FROM ${DOCKER_USERNAME}/alpine

RUN set -x ; echo 1

FROM ${DOCKER_USERNAME}/alpine

RUN set -x ; echo 2
```

對於上述 Dockerfile 兩個 `FROM` 指令都可以使用 `${DOCKER_USERNAME}`，對於在各個階段中使用的變數都必須在每個階段分別指定：

```docker
ARG DOCKER_USERNAME=library

FROM ${DOCKER_USERNAME}/alpine

# 在FROM 之後使用變數，必須在每個階段分別指定
ARG DOCKER_USERNAME=library

RUN set -x ; echo ${DOCKER_USERNAME}

FROM ${DOCKER_USERNAME}/alpine

# 在FROM 之後使用變數，必須在每個階段分別指定
ARG DOCKER_USERNAME=library

RUN set -x ; echo ${DOCKER_USERNAME}
```

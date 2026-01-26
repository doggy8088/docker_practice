# ENV 設定環境變數

格式有兩種：

* `ENV <key> <value>`
* `ENV <key1>=<value1> <key2>=<value2>...`

這個指令很簡單，就是設定環境變數而已，無論是後面的其它指令，如 `RUN`，還是執行時的應用，都可以直接使用這裡定義的環境變數。

```docker
ENV VERSION=1.0 DEBUG=on \
    NAME="Happy Feet"
```

這個例子中示範了如何換行，以及對含有空格的值用雙引號括起來的辦法，這和 Shell 下的行為是一致的。

定義了環境變數，那麼在後續的指令中，就可以使用這個環境變數。比如在官方 `node` 映象 `Dockerfile` 中，就有類似這樣的程式碼：

```docker
ENV NODE_VERSION 7.2.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs
```

在這裡先定義了環境變數 `NODE_VERSION`，其後的 `RUN` 這層裡，多次使用 `$NODE_VERSION` 來進行操作定製。可以看到，將來升級映象建立版本的時候，只需要更新 `7.2.0` 即可，`Dockerfile` 建立維護變得更輕鬆了。

下列指令可以支援環境變數展開： `ADD`、`COPY`、`ENV`、`EXPOSE`、`FROM`、`LABEL`、`USER`、`WORKDIR`、`VOLUME`、`STOPSIGNAL`、`ONBUILD`、`RUN`。

可以從這個指令清單裡感覺到，環境變數可以使用的地方很多，很強大。透過環境變數，我們可以讓一份 `Dockerfile` 製作更多的映象，只需使用不同的環境變數即可。

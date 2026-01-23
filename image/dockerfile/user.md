# USER 指定當前使用者

格式：`USER <使用者名>[:<使用者組>]`

`USER` 指令和 `WORKDIR` 相似，都是改變環境狀態並影響以後的層。`WORKDIR` 是改變工作目錄，`USER` 則是改變之後層的執行 `RUN`, `CMD` 以及 `ENTRYPOINT` 這類指令的身份。

注意，`USER` 只是幫助你切換到指定使用者而已，這個使用者必須是事先建立好的，否則無法切換。

```docker
RUN groupadd -r redis && useradd -r -g redis redis
USER redis
RUN [ "redis-server" ]
```

如果以 `root` 執行的指令碼，在執行期間希望改變身份，比如希望以某個已經建立好的使用者來執行某個服務程序，不要使用 `su` 或者 `sudo`，這些都需要比較麻煩的設定，而且在 TTY 缺失的環境下經常出錯。建議使用 [`gosu`](https://github.com/tianon/gosu)。

```docker
# 建立 redis 使用者，並使用 gosu 換另一個使用者執行指令
RUN groupadd -r redis && useradd -r -g redis redis
# 下載 gosu
RUN wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/1.12/gosu-amd64" \
    && chmod +x /usr/local/bin/gosu \
    && gosu nobody true
# 設定 CMD，並以另外的使用者執行
CMD [ "exec", "gosu", "redis", "redis-server" ]
```

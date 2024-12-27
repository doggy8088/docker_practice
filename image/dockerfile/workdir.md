# WORKDIR 指定工作目錄

格式為 `WORKDIR <工作目錄路徑>`。

使用 `WORKDIR` 指令可以來指定工作目錄（或者稱為當前目錄），以後各層的當前目錄就被改為指定的目錄，如該目錄不存在，`WORKDIR` 會幫你建立目錄。

之前提到一些初學者常犯的錯誤是把 `Dockerfile` 等同於 Shell 指令碼來書寫，這種錯誤的理解還可能會導致出現下面這樣的錯誤：

```docker
RUN cd /app
RUN echo "hello" > world.txt
```

如果將這個 `Dockerfile` 進行建立映象執行後，會發現找不到 `/app/world.txt` 檔案，或者其內容不是 `hello`。原因其實很簡單，在 Shell 中，連續兩行是同一個程序執行環境，因此前一個指令修改的記憶體狀態，會直接影響後一個指令；而在 `Dockerfile` 中，這兩行 `RUN` 指令的執行環境根本不同，是兩個完全不同的容器。這就是對 `Dockerfile` 建立分層儲存的概念不瞭解所導致的錯誤。

之前說過每一個 `RUN` 都是啟動一個容器、執行指令、然後送出儲存層檔案變更。第一層 `RUN cd /app` 的執行僅僅是當前程序的工作目錄變更，一個記憶體上的變化而已，其結果不會造成任何檔案變更。而到第二層的時候，啟動的是一個全新的容器，跟第一層的容器更完全沒關係，自然不可能繼承前一層建立過程中的記憶體變化。

因此如果需要改變以後各層的工作目錄的位置，那麼應該使用 `WORKDIR` 指令。

```docker
WORKDIR /app

RUN echo "hello" > world.txt
```

如果你的 `WORKDIR` 指令使用的相對路徑，那麼所切換的路徑與之前的 `WORKDIR` 有關：

```docker
WORKDIR /a
WORKDIR b
WORKDIR c

RUN pwd
```

`RUN pwd` 的工作目錄為 `/a/b/c`。

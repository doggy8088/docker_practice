# COPY 複製檔案

格式：

* `COPY [--chown=<user>:<group>] <源路徑>... <目標路徑>`
* `COPY [--chown=<user>:<group>] ["<源路徑1>",... "<目標路徑>"]`

和 `RUN` 指令一樣，也有兩種格式，一種類似於指令行，一種類似於函式呼叫。

`COPY` 指令將從建立上下文目錄中 `<源路徑>` 的檔案/目錄複製到新的一層的映象內的 `<目標路徑>` 位置。比如：

```docker
COPY package.json /usr/src/app/
```

`<源路徑>` 可以是多個，甚至可以是萬用字元，其萬用字元規則要滿足 Go 的 [`filepath.Match`](https://golang.org/pkg/path/filepath/#Match) 規則，如：

```docker
COPY hom* /mydir/
COPY hom?.txt /mydir/
```

`<目標路徑>` 可以是容器內的絕對路徑，也可以是相對於工作目錄的相對路徑（工作目錄可以用 `WORKDIR` 指令來指定）。目標路徑不需要事先建立，如果目錄不存在會在複製檔案前先行建立缺失目錄。

此外，還需要注意一點，使用 `COPY` 指令，源檔案的各種元資料都會保留。比如讀、寫、執行許可權、檔案變更時間等。這個屬性對於映象定製很有用。特別是建立相關檔案都在使用 Git 進行管理的時候。

在使用該指令的時候還可以加上 `--chown=<user>:<group>` 選項來改變檔案的所屬使用者及所屬組。

```docker
COPY --chown=55:mygroup files* /mydir/
COPY --chown=bin files* /mydir/
COPY --chown=1 files* /mydir/
COPY --chown=10:11 files* /mydir/
```

如果源路徑為資料夾，複製的時候不是直接複製該資料夾，而是將資料夾中的內容複製到目標路徑。

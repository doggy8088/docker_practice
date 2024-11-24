# ONBUILD 為他人做嫁衣裳

格式：`ONBUILD <其它指令>`。

`ONBUILD` 是一個特殊的指令，它後面跟的是其它指令，比如 `RUN`, `COPY` 等，而這些指令，在當前映象建立時並不會被執行。只有當以當前映象為基礎映象，去建立下一級映象的時候才會被執行。

`Dockerfile` 中的其它指令都是為了定製當前映象而準備的，惟有 `ONBUILD` 是為了幫助別人定製自己而準備的。

假設我們要製作 Node.js 所寫的應用的映象。我們都知道 Node.js 使用 `npm` 進行套件管理，所有依賴、設定、啟動訊息等會放到 `package.json` 檔案裡。在拿到程式程式碼後，需要先進行 `npm install` 才可以獲得所有需要的依賴。然後就可以透過 `npm start` 來啟動應用。因此，一般來說會這樣寫 `Dockerfile`：

```docker
FROM node:slim
RUN mkdir /app
WORKDIR /app
COPY ./package.json /app
RUN [ "npm", "install" ]
COPY . /app/
CMD [ "npm", "start" ]
```

把這個 `Dockerfile` 放到 Node.js 專案的根目錄，建立好映象後，就可以直接拿來啟動容器執行。但是如果我們還有第二個 Node.js 專案也差不多呢？好吧，那就再把這個 `Dockerfile` 複製到第二個專案裡。那如果有第三個專案呢？再複製麼？檔案的副本越多，版本控制就越困難，讓我們繼續看這樣的場景維護的問題。

如果第一個 Node.js 專案在開發過程中，發現這個 `Dockerfile` 裡存在問題，比如敲錯字了、或者需要安裝額外的套件，然後開發人員修復了這個 `Dockerfile`，再次建立，問題解決。第一個專案沒問題了，但是第二個專案呢？雖然最初 `Dockerfile` 是複製、貼上自第一個專案的，但是並不會因為第一個專案修復了他們的 `Dockerfile`，而第二個專案的 `Dockerfile` 就會被自動修復。

那麼我們可不可以做一個基礎映象，然後各個專案使用這個基礎映象呢？這樣基礎映象更新，各個專案不用同步 `Dockerfile` 的變化，重新建立後就繼承了基礎映象的更新？好吧，可以，讓我們看看這樣的結果。那麼上面的這個 `Dockerfile` 就會變為：

```docker
FROM node:slim
RUN mkdir /app
WORKDIR /app
CMD [ "npm", "start" ]
```

這裡我們把專案相關的建立指令拿出來，放到子專案裡去。假設這個基礎映象的名字為 `my-node` 的話，各個專案內的自己的 `Dockerfile` 就變為：

```docker
FROM my-node
COPY ./package.json /app
RUN [ "npm", "install" ]
COPY . /app/
```

基礎映象變化後，各個專案都用這個 `Dockerfile` 重新建立映象，會繼承基礎映象的更新。

那麼，問題解決了麼？沒有。準確說，只解決了一半。如果這個 `Dockerfile` 裡面有些東西需要調整呢？比如 `npm install` 都需要加一些引數，那怎麼辦？這一行 `RUN` 是不可能放入基礎映象的，因為涉及到了當前項目的 `./package.json`，難道又要一個個修改麼？所以說，這樣製作基礎映象，只解決了原來的 `Dockerfile` 的前4條指令的變化問題，而後面三條指令的變化則完全沒辦法處理。

`ONBUILD` 可以解決這個問題。讓我們用 `ONBUILD` 重新寫一下基礎映象的 `Dockerfile`:

```docker
FROM node:slim
RUN mkdir /app
WORKDIR /app
ONBUILD COPY ./package.json /app
ONBUILD RUN [ "npm", "install" ]
ONBUILD COPY . /app/
CMD [ "npm", "start" ]
```

這次我們回到原始的 `Dockerfile`，但是這次將專案相關的指令加上 `ONBUILD`，這樣在建立基礎映象的時候，這三行並不會被執行。然後各個專案的 `Dockerfile` 就變成了簡單地：

```docker
FROM my-node
```

是的，只有這麼一行。當在各個專案目錄中，用這個只有一行的 `Dockerfile` 建立映象時，之前基礎映象的那三行 `ONBUILD` 就會開始執行，成功的將當前專案的程式碼複製進映象、並且針對本專案執行 `npm install`，生成應用映象。

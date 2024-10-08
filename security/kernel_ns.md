# 核心命名空間

Docker 容器和 LXC 容器很相似，所提供的安全屬性也差不多。當用 `docker run` 啟動一個容器時，在後台 Docker 為容器建立了一個獨立的命名空間和控制組集合。

命名空間提供了最基礎也是最直接的隔離，在容器中執行的程序不會被執行在主機上的程序和其它容器發現和作用。

每個容器都有自己獨有的網路棧，意味著它們不能訪問其他容器的 sockets 或介面。不過，如果主機系統上做了相應的設定，容器可以像跟主機互動一樣的和其他容器互動。當指定公共連接埠或使用 links 來連線 2 個容器時，容器就可以相互通訊了（可以根據設定來限制通訊的策略）。

從網路架構的角度來看，所有的容器透過本地主機的網橋接口相互通訊，就像物理機器透過物理交換機通訊一樣。

那麼，核心中實現命名空間和私有網路的程式碼是否足夠成熟？

核心命名空間從 2.6.15 版本（2008 年 7 月發布）之後被引入，數年間，這些機制的可靠性在諸多大型生產系統中被實踐驗證。

實際上，命名空間的想法和設計提出的時間要更早，最初是為了在核心中引入一種機制來實現 [OpenVZ](https://en.wikipedia.org/wiki/OpenVZ) 的屬性。
而 OpenVZ 專案早在 2005 年就發布了，其設計和實現都已經十分成熟。

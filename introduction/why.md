# 為什麼要使用 Docker？

作為一種新興的虛擬化方式，`Docker` 跟傳統的虛擬化方式相比具有眾多的優勢。

## 更高效的利用系統資源

由於容器不需要進行硬體虛擬以及執行完整作業系統等額外開銷，`Docker` 對系統資源的利用率更高。無論是應用執行速度、記憶體損耗或者檔案儲存速度，都要比傳統虛擬機技術更高效。因此，相比虛擬機技術，一個相同設定的主機，往往可以執行更多數量的應用。

## 更快速的啟動時間

傳統的虛擬機技術啟動應用服務往往需要數分鐘，而 `Docker` 容器應用，由於直接執行於宿主核心，無需啟動完整的作業系統，因此可以做到秒級、甚至毫秒級的啟動時間。大大的節約了開發、測試、部署的時間。

## 一致的執行環境

開發過程中一個常見的問題是環境一致性問題。由於開發環境、測試環境、生產環境不一致，導致有些 bug 並未在開發過程中被發現。而 `Docker` 的映象提供了除核心外完整的執行時環境，確保了應用執行環境一致性，從而不會再出現 *「這段程式碼在我機器上沒問題啊」* 這類問題。

## 持續交付和部署

對開發和運維（[DevOps](https://zh.wikipedia.org/wiki/DevOps)）人員來說，最希望的就是一次建立或設定，可以在任意地方正常執行。

使用 `Docker` 可以透過定製應用映象來實現持續整合、持續交付、部署。開發人員可以透過 [Dockerfile](../image/dockerfile/) 來進行映象建立，並結合 [持續整合(Continuous Integration)](https://en.wikipedia.org/wiki/Continuous_integration) 系統進行整合測試，而運維人員則可以直接在生產環境中快速部署該映象，甚至結合 [持續部署(Continuous Delivery/Deployment)](https://en.wikipedia.org/wiki/Continuous_delivery) 系統進行自動部署。

而且使用 [`Dockerfile`](../image/build.md) 使映象建立透明化，不僅僅開發團隊可以理解應用執行環境，也方便運維團隊理解應用執行所需條件，幫助更好的生產環境中部署該映象。

## 更輕鬆的遷移

由於 `Docker` 確保了執行環境的一致性，使得應用的遷移更加容易。`Docker` 可以在很多平台上執行，無論是物理機、虛擬機、公有雲、私有雲，甚至是筆記本，其執行結果是一致的。因此使用者可以很輕易的將在一個平台上執行的應用，遷移到另一個平台上，而不用擔心執行環境的變化導致應用無法正常執行的情況。

## 更輕鬆的維護和擴充套件

`Docker` 使用的分層儲存以及映象的技術，使得應用重複部分的複用更為容易，也使得應用的維護更新更加簡單，基於基礎映象進一步擴充套件映象也變得非常簡單。此外，`Docker` 團隊同各個開源專案團隊一起維護了一大批高質量的 [官方映象](https://hub.docker.com/search/?type=image&image_filter=official)，既可以直接在生產環境使用，又可以作為基礎進一步定製，大大的降低了應用服務的映象製作成本。

## 對比傳統虛擬機總結

|   屬性     |   容器    |   虛擬機   |
| :--------   | :--------  | :---------- |
| 啟動       | 秒級      | 分鐘級     |
| 硬碟使用   | 一般為 `MB` | 一般為 `GB`  |
| 效能       | 接近原生  | 弱於       |
| 系統支援量 | 單機支援上千個容器 | 一般幾十個 |

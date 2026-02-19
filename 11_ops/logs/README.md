# 日誌管理

在容器化環境中，日誌管理比傳統環境更為複雜。容器是短暫的，意味著容器內的日誌檔案可能會隨著容器的銷燬而丟失。因此，我們需要一種集中式的日誌管理方案來收集、儲存和分析容器日誌。

## Docker 日誌驅動

Docker 提供了多種日誌驅動（Log Driver）機制，允許我們將容器日誌轉發到不同的後端。

常見的日誌驅動包括：

* `json-file`: 預設驅動，將日誌以 JSON 格式寫入本地檔案。
* `syslog`: 將日誌轉發到 syslog 伺服器。
* `journald`: 將日誌寫入 systemd journal。
* `fluentd`: 將日誌轉發到 fluentd 收集器。
* `gelf`: 支援 GELF 協定的日誌後端（如 Graylog）。
* `awslogs`: 傳送到 Amazon CloudWatch Logs。

## 日誌管理方案

對於大規模的容器叢集，我們通常會採用 EFK (Elasticsearch + Fluentd + Kibana) 或 ELK (Elasticsearch + Logstash + Kibana) 方案。

* **Elasticsearch**: 負責日誌的儲存和全文檢索。
* **Fluentd/Logstash**: 負責日誌的採集、過濾和轉發。
* **Kibana**: 負責日誌的視覺化展示。

本章將介紹如何使用 EFK 方案來處理 Docker 容器日誌。

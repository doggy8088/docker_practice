# Prometheus + Grafana

[Prometheus](https://prometheus.io/) 是一個開源的系統監控和報警工具包。它受 Google Borgmon 的啟發，由 SoundCloud 在 2012 年建立。

## 架構簡介

Prometheus 的主要元件包括：

* **Prometheus Server**: 核心元件，負責收集和儲存時間序列資料。
* **Exporters**: 負責向 Prometheus 暴露監控資料（如 Node Exporter, cAdvisor）。
* **Alertmanager**: 處理報警傳送。
* **Pushgateway**: 用於支援短生命週期的 Job 推送資料。

## 快速部署

我們可以使用 Docker Compose 快速部署一套 Prometheus + Grafana 監控環境。

### 1. 準備設定檔案

建立 `prometheus.yml`:

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']
```

### 2. 編寫 Docker Compose 檔案

建立 `docker-compose.yml`:

```yaml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    networks:
      - monitoring
    depends_on:
      - prometheus

  node-exporter:
    image: prom/node-exporter:latest
    ports:
      - "9100:9100"
    networks:
      - monitoring

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    networks:
      - monitoring

networks:
  monitoring:
```

### 3. 啟動服務

```bash
$ docker-compose up -d
```

啟動後，訪問以下地址：

* Prometheus: `http://localhost:9090`
* Grafana: `http://localhost:3000` (預設賬號密碼: admin/admin)

## 設定 Grafana 面板

1. 在 Grafana 中新增 Prometheus 資料來源，URL 填寫 `http://prometheus:9090`。
2. 匯入現成的 Dashboard 樣板，例如 [Node Exporter Full](https://grafana.com/grafana/dashboards/1860) (ID: 1860) 和 [Docker Container](https://grafana.com/grafana/dashboards/193) (ID: 193)。

這樣，你就擁有了一個直觀的容器監控大屏。

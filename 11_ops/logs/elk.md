## ELK/EFK 堆疊


ELK (Elasticsearch, Logstash, Kibana) 是目前業界最流行的開源日誌解決方案。而在容器領域，由於 Fluentd 更加輕量級且對容器支援更好，EFK (Elasticsearch, Fluentd, Kibana) 組合也變得非常流行。

### 方案架構

我們將採用以下架構：

1. **Docker Container**: 容器將日誌輸出到標準輸出 (stdout/stderr)。
2. **Fluentd**: 作為 Docker 的 Logging Driver 或執行為守護容器，收集容器日誌。
3. **Elasticsearch**: 儲存從 Fluentd 接收到的日誌資料。
4. **Kibana**: 從 Elasticsearch 讀取資料並進行視覺化展示。

### 部署流程


我們將使用 Docker Compose 來一鍵部署整個日誌堆疊。

#### 1. 編寫 Compose 檔案

1. 編寫 `compose.yaml`（或 `docker-compose.yml`）設定如下：

```yaml
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.17.0
    container_name: elasticsearch
    environment:
      - "discovery.type=single-node"
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ports:
      - "9200:9200"
    volumes:
      - es_data:/usr/share/elasticsearch/data
    networks:
      - logging

  kibana:
    image: docker.elastic.co/kibana/kibana:7.17.0
    container_name: kibana
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    ports:
      - "5601:5601"
    links:
      - elasticsearch
    networks:
      - logging

  fluentd:
    image: fluent/fluentd-kubernetes-daemonset:v1.14.3-debian-elasticsearch7-1.0
    container_name: fluentd
    environment:
      - "FLUENT_ELASTICSEARCH_HOST=elasticsearch"
      - "FLUENT_ELASTICSEARCH_PORT=9200"
      - "FLUENT_ELASTICSEARCH_SCHEME=http"
      - "FLUENT_UID=0"
    ports:
      - "24224:24224"
      - "24224:24224/udp"
    links:
      - elasticsearch
    volumes:
      - ./fluentd/conf:/fluentd/etc
    networks:
      - logging

volumes:
  es_data:

networks:
  logging:
```

#### 2. 設定 Fluentd

建立 `fluentd/conf/fluent.conf`:

```ini
<source>
  @type forward
  port 24224
  bind 0.0.0.0
</source>

<match *.**>
  @type copy
  <store>
    @type elasticsearch
    host elasticsearch
    port 9200
    logstash_format true
    logstash_prefix docker
    logstash_dateformat %Y%m%d
    include_tag_key true
    type_name access_log
    tag_key @log_name
    flush_interval 1s
  </store>
  <store>
    @type stdout
  </store>
</match>
```

#### 3. 設定應用容器使用 fluentd 驅動

啟動一個測試容器，指定日誌驅動為 `fluentd`:

```bash
docker run -d \
  --log-driver=fluentd \
  --log-opt fluentd-address=localhost:24224 \
  --log-opt tag=nginx-test \
  --name nginx-test \
  nginx
```

**注意**: 確保 `fluentd` 容器已經啟動並監聽在 `localhost:24224`。在生產環境中，如果你是在不同機器上，需要將 `localhost` 替換為執行 fluentd 的主機 IP。

#### 4. 在 Kibana 中檢視日誌

1. 訪問 `http://localhost:5601`。
2. 進入 **Management**->**Kibana**->**Index Patterns**。
3. 建立新的 Index Pattern，輸入 `docker-*` (我們在 fluent.conf 中設定的字首)。
4. 選擇 `@timestamp` 作為時間欄位。
5. 去 **Discover** 頁面，你就能看到 Nginx 容器的日誌了。

### 總結

透過 Docker 的日誌驅動機制，結合 ELK/EFK 強大的收集和分析能力，我們可以輕鬆建立一個能夠處理海量日誌的監控平台，這對於排查生產問題至關重要。

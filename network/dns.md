# 設定 DNS

## 容器的 DNS 機制

Docker 容器的 DNS 設定有兩種情況：

1. **預設 Bridge 網路**：繼承宿主機的 DNS 設定（`/etc/resolv.conf`）。
2. **自定義網路**（推薦）：使用 Docker 嵌入式 DNS 伺服器 (Embedded DNS)，支援透過**容器名**進行服務發現。

---

## 嵌入式 DNS (Embedded DNS)

這是 Docker 網路最強大的功能之一。在自定義網路中，容器可以透過"名字"找到彼此，而不需要知道對方的 IP（因為 IP 可能會變）。

```bash
# 1. 建立自定義網路
$ docker network create mynet

# 2. 啟動容器 web 並加入網路
$ docker run -d --name web --network mynet nginx

# 3. 啟動容器 client 並嘗試 ping web
$ docker run -it --rm --network mynet alpine ping web
PING web (172.18.0.2): 56 data bytes
64 bytes from 172.18.0.2: seq=0 ttl=64 time=0.074 ms
```

**原理**：
Docker 守護程序在 `127.0.0.11` 執行了一個 DNS 伺服器。容器內的 DNS 請求會被轉發到這裡。如果是容器名，解析為容器 IP；如果是外部網域名稱（如 google.com），轉發給上游 DNS。

---

## 設定 DNS 引數

如果你需要手動設定容器的 DNS（例如使用內網 DNS 伺服器），可以在 `docker run` 中使用以下引數：

### 1. --dns

指定 DNS 伺服器 IP。

```bash
$ docker run -it --dns=114.114.114.114 ubuntu cat /etc/resolv.conf
nameserver 114.114.114.114
```

### 2. --dns-search

指定 DNS 搜尋域。例如設定為 `example.com`，則 `ping host` 會嘗試解析 `host.example.com`。

```bash
$ docker run --dns-search=example.com myapp
```

### 3. --hostname (-h)

設定容器的主機名。

```bash
$ docker run -h myweb nginx
```

---

## 全域 DNS 設定

如果希望所有容器都使用特定的 DNS 伺服器（而不是繼承宿主機），可以修改 `/etc/docker/daemon.json`：

```json
{
  "dns": [
    "114.114.114.114",
    "8.8.8.8"
  ]
}
```

修改後需要重啟 Docker 服務：`systemctl restart docker`。

---

## 常見問題

### Q: 容器無法解析網域名稱

**現象**：`ping www.baidu.com` 失敗，但 `ping 8.8.8.8` 成功。

**解決**：
1. 宿主機的 `/etc/resolv.conf` 可能有問題（例如使用了本地回環地址 127.0.0.53，特別是 Ubuntu 系統）。Docker 可能會嘗試修復，但有時會失敗。
2. 嘗試手動指定 DNS：`docker run --dns 8.8.8.8 ...`
3. 檢查防火牆是否攔截了 UDP 53 連接埠。

### Q: 無法透過容器名通訊

**現象**：`ping db` 提示 `bad address 'db'`。

**原因**：
- 你可能在使用**預設的 bridge 網路**。預設 bridge 網路**不支援**透過容器名進行 DNS 解析（這是一個歷史遺留設計）。
- **解決**：使用自定義網路 (`docker network create ...`)。

---

## 本章小結

| 場景 | DNS 行為 | 備註 |
|------|----------|------|
| **預設網路** | 繼承宿主機 | 不支援容器名解析 |
| **自定義網路** | Docker 嵌入式 DNS | ✅ 支援容器名解析 |
| **手動指定** | 使用 `--dns` | 覆蓋預設設定 |

## 延伸閱讀

- [網路模式](README.md)：Docker 網路概覽
- [連接埠對映](port_mapping.md)：外部訪問

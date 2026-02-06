# 常見錯誤速查表

| 錯誤訊息 / 現象 | 可能原因 | 解決方案 |
| :--- | :--- | :--- |
| `Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?` | Docker 服務未啟動 | Linux: `sudo systemctl start docker`<br>Mac/Win: 啟動 Docker Desktop |
| `permission denied while trying to connect to the Docker daemon socket` | 當前使用者不在 `docker` 使用者組 | `sudo usermod -aG docker $USER` (需重新登入) |
| `manifest for ... not found: manifest unknown` | 映象 tag 不存在 | 檢查 Docker Hub 該映象是否存在該 tag，或拼寫是否正確 |
| `connection refused` (pull image) | 網路不通或映象源無法訪問 | 檢查網路，設定[映象加速器](../../install/mirror.md) |
| `Bind for 0.0.0.0:8080 failed: port is already allocated` | 連接埠被佔用 | 檢查佔用連接埠的程序 (`lsof -i:8080`) 並殺掉，或換個連接埠對映 (`-p 8081:80`) |
| `exec user process caused "exec format error"` | 架構不對應 (如在 x86 上跑 ARM 映象) | 使用 `docker buildx` 建立多架構映象，或拉取對應架構的映象 |
| `standard_init_linux.go:211: exec user process caused "no such file or directory"` | 找不到直譯器或依賴庫 | 檢查 `ENTRYPOINT`/`CMD` 指令碼開頭的 shebang (`#!/bin/sh` vs `#!/bin/bash`)，或確認二進位檔案是否依賴缺失 (Alpine 常見缺少 glibc) |
| `iptables: No chain/target/match by that name` | 防火牆規則缺失或衝突 | 重啟 Docker 服務重置 iptables 鏈: `sudo systemctl restart docker` |
| 容器內無法訪問外網 | DNS 設定或轉發問題 | 檢查 `/etc/docker/daemon.json` 中的 DNS 設定 |

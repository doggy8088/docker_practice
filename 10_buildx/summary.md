## 10.4 本章小結

Docker Buildx 是 Docker 建立系統的重要進化，提供了高效、安全且支援多平臺的映象建立能力。

| 概念 | 要點 |
|------|------|
| **BuildKit** | 下一代建立引擎，Docker 23.0+ 預設啟用 |
| **快取掛載** | `RUN --mount=type=cache` 加速依賴安裝 |
| **Secret 掛載** | `RUN --mount=type=secret` 安全傳遞金鑰 |
| **buildx build** | 替代 `docker build`，支援更多建立功能 |
| **多架構建立** | `--platform` 引數一鍵建立多種架構映象 |
| **Manifest List** | 多架構映象的索引檔案 |
| **SBOM** | 透過 `--sbom=true` 生成軟體物料清單 |

### 10.4.1 延伸閱讀

- [Dockerfile 指令詳解](../07_dockerfile/README.md)：Dockerfile 編寫基礎
- [多階段建立](../07_dockerfile/7.17_multistage_builds.md)：最佳化映象體積
- [Dockerfile 最佳實踐](../appendix/20.1_best_practices.md)：編寫高效 Dockerfile

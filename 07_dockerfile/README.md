# 第七章 Dockerfile 指令詳解

## 什麼是 Dockerfile

Dockerfile 是一個文字檔案，其內包含了一條條的 **指令 (Instruction)**，每一條指令建立一層，因此每一條指令的內容，就是描述該層應當如何建立。

在[第四章](../04_image/README.md)中，我們透過 `docker commit` 學習了映象的構成。但是，手動 `commit` 只能作為臨時修補，並不適合作為生產環境映象的建立方式。

使用 Dockerfile 建立映象有以下優勢：

*   **自動化**：可以透過 `docker build` 指令自動建立映象。
*   **可重複性**：由於 Dockerfile 是文字檔案，可以確保每次建立的結果一致。
*   **版本控制**：Dockerfile 可以納入版本控制系統 (如 Git)，便於追蹤變更。
*   **透明性**：任何人都可以透過閱讀 Dockerfile 瞭解映象的建立過程。

## Dockerfile 編寫哲學

在深入每個指令的細節之前，筆者想強調一個至關重要的原則：**Dockerfile 不是指令碼，而是映象的『設計圖』**。這個區別決定了你如何思考每條指令的作用。

相比編寫 Bash 指令碼的思維（『按順序執行這些指令』），Dockerfile 的思維應該是（『這一層映象應該如何建立，下一層如何分層』）。這個思維轉變會影響你的決策：

- **合併指令**：一個 `RUN apt-get update && apt-get install ...` 應該寫在一起，而不是分開成多個 `RUN` 指令，因為它們是同一個『層』的邏輯
- **選擇合適的指令**：`COPY` vs `ADD`、`CMD` vs `ENTRYPOINT` 這些選擇不是隨意的，而是根據映象分層的語義來決定的
- **最佳化映象大小**：最後才清理快取、刪除臨時檔案，讓這些『瘦身』操作在同一層完成

這個章節將詳細介紹各個指令。在學習指令語法時，請始終思考：『這個指令為什麼要以這樣的方式工作？如果我是 Docker，我應該如何設計它？』

## Dockerfile 基本結構

Dockerfile 一般分為四部分：基礎映象訊息、維護者訊息、映象操作指令和容器啟動時執行指令。

### 指令詳解

本章將詳細講解 Dockerfile 中的各個指令：

*   [RUN 執行指令](7.1_run.md)
*   [COPY 複製檔案](7.2_copy.md)
*   [ADD 更高階的複製檔案](7.3_add.md)
*   [CMD 容器啟動指令](7.4_cmd.md)
*   [ENTRYPOINT 入口點](7.5_entrypoint.md)
*   [ENV 設定環境變數](7.6_env.md)
*   [ARG 建立引數](7.7_arg.md)
*   [VOLUME 定義匿名卷](7.8_volume.md)
*   [EXPOSE 暴露連接埠](7.9_expose.md)
*   [WORKDIR 指定工作目錄](7.10_workdir.md)
*   [USER 指定當前使用者](7.11_user.md)
*   [HEALTHCHECK 健康檢查](7.12_healthcheck.md)
*   [ONBUILD 為他人作嫁衣裳](7.13_onbuild.md)
*   [LABEL 為映象新增元資料](7.14_label.md)
*   [SHELL 指令](7.15_shell.md)

### 高階屬性

本章還將介紹 Dockerfile 的高階屬性：

*   [多階段建立](7.17_multistage_builds.md)
*   [多階段建立實戰：Laravel 應用](7.18_multistage_builds_laravel.md)

### 參考與最佳實踐

此外，我們還將介紹 Dockerfile 的最佳實踐和常見問題。

*   [參考文件](7.16_references.md)

## 使用 Dockerfile 建立映象

建立映象的基本指令格式為：

```bash
docker build [選項] <上下文路徑/URL/->
```
例如，在 Dockerfile 所在目錄執行：

```bash
docker build -t my-image:1.0 .
```

### 關於版本號最佳實踐

本章中的 Dockerfile 範例使用的基礎映象標籤遵循以下原則：

- **通用標籤**（如 `ubuntu:24.04`、`alpine`、`nginx`）：保持原樣，無需修改
- **基礎映象版本號**（如 `node:20`、`python:3.12`）：使用主或次版本號而非完整版本號（patch），這樣可以自動獲取最新的補丁版本，確保獲得安全更新
- **避免**：不建議使用 `latest` 標籤和完整的 patch 版本號（如 `20.10.0`）作為基礎映象，因為這會導致建立的不可重現性或安全風險

讀者在使用這些範例時，應根據實際生產環境需求選擇合適的版本號。

更多關於 `docker build` 的用法，我們在實戰中會結合具體指令進行示範。

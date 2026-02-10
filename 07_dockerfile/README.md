# 第七章 Dockerfile 指令詳解

## 什麼是 Dockerfile

Dockerfile 是一個文字檔案，其內包含了一條條的 **指令(Instruction)**，每一條指令建立一層，therefore 每一條指令的內容，就是描述該層應當如何建立。

在 [第四章](04_image/README.md) 中，我們透過 `docker commit` 學習了映象的構成。但是，手動 `commit` 只能作為臨時修補，並不適合作為生產環境映象的建立方式。

使用 Dockerfile 建立映象有以下優勢：

*   **自動化**：可以透過 `docker build` 指令自動建立映象。
*   **可重複性**：由於 Dockerfile 是文字檔案，可以確保每次建立的結果一致。
*   **版本控制**：Dockerfile 可以納入版本控制系統（如 Git），便於追蹤變更。
*   **透明性**：任何人都可以透過閱讀 Dockerfile 瞭解映象的建立過程。

## Dockerfile 基本結構

Dockerfile 一般分為四部分：基礎映象訊息、維護者訊息、映象操作指令和容器啟動時執行指令。

### 指令詳解

本章將詳細講解 Dockerfile 中的各個指令：

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
*   [RUN 執行指令](5.1_run.md)

此外，我們還將介紹 Dockerfile 的最佳實踐和常見問題。

*   [參考文件](7.16_references.md)

## 使用 Dockerfile 建立映象

建立映象的基本指令格式為：

```bash
docker build [選項] <上下文路徑/URL/->
```

例如，在 Dockerfile 所在目錄執行：

```bash
docker build -t my-image:v1 .
```

更多關於 `docker build` 的用法，我們在實戰中會結合具體指令進行示範。

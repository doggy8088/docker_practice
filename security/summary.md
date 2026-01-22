# 總結

總體來看，Docker 容器還是十分安全的，特別是在容器內不使用 root 許可權來執行程序的話。

另外，使用者可以使用現有工具，比如 [Apparmor](https://docs.docker.com/engine/security/apparmor/), [Seccomp](https://docs.docker.com/engine/security/seccomp/), SELinux, GRSEC 來增強安全性；甚至自己在核心中實現更復雜的安全機制。

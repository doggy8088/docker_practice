# 離線部署Docker

[TOC]

生產環境中一般都是沒有公網資源的，本文介紹如何在生產伺服器上離線部署`Docker`



括號內的字母表示該操作需要在哪些伺服器上執行

<img src="_images/image-20200412202617411.png" alt="Docker-offile-install-top" style="zoom:30%;" />

## Centos7 離線安裝Docker

### YUM本地檔案安裝（推薦）

推薦這種方式，是因為在生產環境種一般會選定某個指定的文件軟體版本使用。

####  查詢可用的軟體版本(A)

```bash
#下載清華的映象源檔案
wget -O /etc/yum.repos.d/docker-ce.repo https://download.docker.com/linux/centos/docker-ce.repo

sudo sed -i 's+download.docker.com+mirrors.tuna.tsinghua.edu.cn/docker-ce+' /etc/yum.repos.d/docker-ce.repo

yum update
```

```bash
sudo yum list docker-ce --showduplicates|sort -r

Loading mirror speeds from cached hostfile
Loaded plugins: fastestmirror
docker-ce.x86_64            24.0.4-1.el7                        docker-ce-stable
docker-ce.x86_64            3:19.03.7-3.el7                     docker-ce-stable
docker-ce.x86_64            3:19.03.6-3.el7                     docker-ce-stable
docker-ce.x86_64            3:19.03.5-3.el7                     docker-ce-stable
docker-ce.x86_64            3:19.03.4-3.el7                     docker-ce-stable
docker-ce.x86_64            3:19.03.3-3.el7                     docker-ce-stable
docker-ce.x86_64            3:19.03.2-3.el7                     docker-ce-stable
docker-ce.x86_64            3:19.03.1-3.el7                     docker-ce-stable
....
```

#### 下載到指定資料夾(A)

```bash
sudo yum install --downloadonly --downloaddir=/tmp/docker24_offline_install/ docker-ce-24.0.4-1.el7 docker-ce-cli-24.0.4-1.el7
```

```bash
Dependencies Resolved

====================================================================================================================================================================================
 Package                                          Arch                                  Version                                         Repository                             Size
====================================================================================================================================================================================
Installing:
 docker-ce                                        x86_64                                24.0.4-1.el7                                 docker                                 25 M
Installing for dependencies:
 container-selinux                                noarch                                24.0.4-1.el7                                   extras                                 39 k
 containerd.io                                    x86_64                                24.0.4-1.el7                                  docker                                 23 M
 docker-ce-cli                                    x86_64                                24.0.4-1.el7                                 docker                                 40 M

Transaction Summary
====================================================================================================================================================================================
Install  1 Package (+3 Dependent packages)

Total download size: 87 M
Installed size: 363 M
Background downloading packages, then exiting:
(1/4): container-selinux-24.0.4-1.el7.noarch.rpm                                                                                                              |  39 kB  00:00:00
(2/4): containerd.io-24.0.4-1.el7.x86_64.rpm                                                                                                               |  23 MB  00:00:00
(3/4): docker-ce-24.0.4-1.el7.x86_64.rpm                                                                                                                    |  25 MB  00:00:00
(4/4): docker-ce-cli-24.0.4-1.el7.x86_64.rpm                                                                                                                |  40 MB  00:00:00
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                                                               118 MB/s |  87 MB  00:00:00
exiting because "Download Only" specified
```
#### 複製到目標伺服器之後進入資料夾安裝(C-N)

* 離線安裝時，必須使用rpm指令不檢查依賴的方式安裝
```bash
rpm -Uvh *.rpm --nodeps --force
```

#### 鎖定軟體版本(C-N)

##### 下載鎖定版本軟體
可參考下文的網路源搭建
```bash
sudo yum install yum-plugin-versionlock
```

##### 鎖定軟體版本

```bash
sudo yum versionlock add docker
```

##### 檢視鎖定清單

```bash
sudo yum versionlock list
```

```bash
Loaded plugins: fastestmirror, versionlock
3:docker-ce-24.0.4-1.el7.*
versionlock list done
```

##### 鎖定後無法再更新

```bash
sudo yum install docker-ce
Loaded plugins: fastestmirror, versionlock
Loading mirror speeds from cached hostfile
Excluding 1 update due to versionlock (use "yum versionlock status" to show it)
Package 3:docker-ce-24.0.4-1.el7.x86_64 already installed and latest version
Nothing to do
```

##### 解鎖指定軟體

```bash
sudo yum versionlock delete docker-ce
```

```bash
Loaded plugins: fastestmirror, versionlock
Deleting versionlock for: 3:docker-ce-24.0.4-1.el7.*
versionlock deleted: 1
```

##### 解鎖所有軟體

```bash
sudo yum versionlock delete all
```



### YUM 本地源伺服器搭建安裝Docker

#### 掛載 ISO 映象搭建本地 File 源（AB）

```bash
# 刪除其他網路源
rm -f /etc/yum.repo.d/*
# 掛載光碟或者iso映象
mount /dev/cdrom /mnt
```

```bash
# 新增本地源
cat >/etc/yum.repos.d/local_files.repo<< EOF
[Local_Files]
name=Local_Files
baseurl=file:///mnt
enable=1
gpgcheck=0
gpgkey=file:///mnt/RPM-GPG-KEY-CentOS-7
EOF
```

```bash
# 測試剛才的本地源,安裝createrepo軟體
yum clean all 
yum install createrepo -y
```



#### 根據本地檔案搭建BASE網路源（B）

```bash
# 安裝apache 伺服器
yum install httpd -y
# 掛載光碟
mount /dev/cdrom /mnt
# 新建centos目錄
mkdir /var/www/html/base
# 複製光碟內的檔案到剛才新建的目錄
cp -R /mnt/Packages/* /var/www/html/base/
createrepo  /var/www/html/centos/
systemctl enable httpd
systemctl start httpd
```

#### 下載Docker-CE 映象倉庫（A）

在有網路的伺服器上下載Docker-ce映象

```bash
# 下載清華的映象源檔案
wget -O /etc/yum.repos.d/docker-ce.repo https://download.docker.com/linux/centos/docker-ce.repo
sudo sed -i 's+download.docker.com+mirrors.tuna.tsinghua.edu.cn/docker-ce+' /etc/yum.repos.d/docker-ce.repo
```

```bash
# 新建 docker-ce目錄
mkdir /tmp/docker-ce/
# 把映象源同步到映象檔案中
reposync -r docker-ce-stable -p /tmp/docker-ce/
```

#### 建立倉庫索引（B）

把下載的 docker-ce 資料夾複製到離線的伺服器

```bash
# 把docker-ce 資料夾複製到/var/www/html/docker-ce
# 重建索引
createrepo  /var/www/html/docker-ce/
```

#### YUM 用戶端設定（C...N）

```bash
rm -f /etc/yum.repo.d/*
cat >/etc/yum.repos.d/local_files.repo<< EOF
[local_base]
name=local_base
# 改成B伺服器地址
baseurl=http://x.x.x.x/base
enable=1
gpgcheck=0
proxy=_none_
[docker_ce]
name=docker_ce
# 改成B伺服器地址
baseurl=http://x.x.x.x/base
enable=1
gpgcheck=0
proxy=_none_
EOF

```

#### Docker 安裝（C...N）

```bash
sudo yum makecache fast
sudo yum install docker-ce docker-ce-cli containerd.io
sudo systemctl enable docker
```



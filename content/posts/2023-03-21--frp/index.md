---
title: This is how to build a frp
tags: ["i-made-thing", "frp", "proxy", "intranet penetration"]
cover: frp.jpg
author: ramber
---

<re-img
    src="frp.jpg"
    title="How to build a frp"
    >
</re-img>

FRP is a high-performance reverse proxy application that can be used for intranet penetration, supporting tcp, udp, http, https, and stcp protocols.
FRP requires the interaction of the server and the client. The server is FRPS and is typically installed on a vps server; The client is a frpc, typically installed on a router, computer, or NAS.
FRPS and FRPC can be used together to remotely access or control intranet devices.

> ## frps(服务端) 一键安装
为了节省精力，这里使用 clangcn 的一键安装脚本
支持的平台：
- Centos - Debian - Ubuntu

### 安装
#### 下载脚本
```
wget --no-check-certificate https://raw.githubusercontent.com/clangcn/onekey-install-shell/master/frps/install-frps.sh -O ./install-frps.sh
```

#### 修改权限
```
chmod 700 ./install-frps.sh
```
#### 开始安装
```
./install-frps.sh install
```
#### 安装过程选项的说明


|选项	|说明	|默认|
|---|---|---|
|download_url|	frp	|镜像源下载地址 aliyun
|bind_port	|frp 提供服务的端口|	5433
|vhost_http_port	|http 服务端口|	80
|vhost_https_port	|https 服务端口|	443
|dashboard_port	|frps 仪表盘端口，用于查看 frp 工作状态|	6443
|dashboard_user	|仪表盘登录账号	|admin
|dashboard_pwd	|仪表盘登录密码	|随机
|token	|frps 和 frpc 通讯密码	|随机
|max_pool_count	|每个代理的连接上线	|50
|log_level	|日志等级	|info
|log_max_days	|日志保留天数	|3
|log_file	|是否开启日志	|enable
|tcp_mux	|是否开启多路复用，减少 tcp 的握手延迟	|enable
|kcp support	|是否开启 kcp	|enable

注意设置安全组或者防火墙


#### 功能命令
|命令	|说明
|frps start	|启动
|frps stop	|停止
|frps restart	|重启
|frps status	|当前服务状态
|frps config vi	|编辑配置
|install-frps.sh update	|更新脚本
|install-frps.sh uninstall	|卸载

## fprc(客户端) 配置
客户端以 Windows 系统为例，路由器或者 NAS 的对照参考即可

### 下载
在这里 frp 下载对应 frps 的版本

下载后只需要这三个文件即可

- frpc.exe
- frpc.ini
- frpc_full.ini
### 配置
修改 `frpc.ini` 文件

```
[common]
server_addr = xxxxxx    # 服务器 IP
server_port = 5443      # bind_port
token = xxxxxx          # 与服务器一致

[test]
type = http             # 类型
local_ip = 127.0.0.1    # 本地 IP
local_port = 80         # 本地端口
use_encryption = true   # 传输加密
use_gzip = true         # gzip 压缩
custom_domains = xxxxxx # 自定义域名
http_user = xxxxxx      # 可选，访问账号
http_pwd = xxxxxx       # 可选，访问密码

[test2]
type =
local_ip =
local_port =
use_encryption =
use_gzip =
custom_domains =
http_user =
http_pwd =

log_file = /dev/null
log_level = info
log_max_days = 3
```
### 启动
在frpc文件目录按住`shift` 点击 `在此处打开命令行窗口` ，运行 `./frpc -c frpc.ini` 即可

Nginx 端口转发
`80` 端口被 `Nginx` 占用的情况下，利用 `Nginx` 进行端口转发

这里 `7080` 是 `frps` 的 `http` 服务端口

添加站点文件 `test.conf` ，内容如下：

```
server
    {
        listen 80;
        server_name www.cnguu.cn;
        location / {
            proxy_pass http://127.0.0.1:7080;
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
        access_log off;
        error_log /dev/null;
    }
    
```
到此配置就结束了
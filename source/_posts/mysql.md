---
title: unbuntu下安装mysql
date: 2019-04-27 20:33:55
keywords:
tags: [mysql]
categories: mysql
summary:
---

## 进入服务器执行以下命令

```bash
ssh root@xxx.xxx.xxx.xxx

sudo apt-get update
sudo apt-get install mysql-server # 这里安装的时候回提示你设置数据库密码(一个很明显的界面)，输入密码并确认即可
sudo apt-get isntall mysql-client
sudo apt-get install libmysqlclient-dev
```
以上就安装完成了mysql，接下来你可以检查以下是否安装成功：
```bash
sudo netstat -tap | grep mysql
```
这条命令执行后，如果安装成功之后，会看到有mysql的socket处于 listen 状态，表示安装成功

此时，可以输入命令 `mysql -u root -p` 登录mysql，过程中会提示输入密码，正常输入即可。

# 使用可视化工具连接数据库

无论你使用什么工具，可能在一开始的时候都无法连接上数据库，这时可以检查一下内容：

> 1. 检查下阿里云或者防火墙3306端口是否开启
> 2. 注释掉 `/etc/mysql/mysql.conf.d/mysqld.cnf` 中的 `bind-address = 127.0.0.1`  这一行，这样所有ip的电脑都可以远程访问。 如果你想指定ip的机器才能远程访问的话，可以将127.0.0.1 换成 对应的机器ip。
> 修改完成之后，执行命令 `service mysql restart` 重启mysql。
> 3. 赋予账号远程登录权限
>  MySQL默认情况下只允许用户本地登录，所以需要赋予用户远程登录的权限。
>  使用上面提到的命令进入mysql，执行以下命令
  ```bash
  mysql> grant all privileges on *.* to '用户'@'ip' identified by '密码' with grant option;
  mysql> flush privileges;
  ```
  第一句语句语句中，*.*代表所有库表，若想给予所有IP权限，”ip”写成“%”,所以第一句sql的意思是给予来自所有IP地址的通过“用户”，“密码”登录的用户对所有库表的所有操作权限。 
  第二句sql，刷新权限。 
  然后执行 `service mysql restart` 重启MySQL生效。




## 参考
[Ubuntu 安装mysql和简单操作](https://www.cnblogs.com/zhuyp1015/p/3561470.html)
[远程连接阿里云MySQL失败解决办法](https://blog.csdn.net/long_yi_1994/article/details/82228743)

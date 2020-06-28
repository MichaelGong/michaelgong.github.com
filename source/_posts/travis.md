---
title: 利用travis部署自己的blog
date: 2019-09-28 09:58:36
keywords: travis
tags: [travis, ci]
categories: [ci]
summary:
---

## 前言
每次写博客的时候都需要在本地环境将博客打包并部署到服务器上，有点繁琐。最近利用了Travis CI进行部署，只需要将修改后的内容push到github就会自动触发相应的构建以及部署流程。

## Travis CI
官方网址：www.travis-ci.org，它是一个持续集成(Continuous integration，简称CI)的工具，可以利用它进行单元测试、项目构建以及部署等流程。

## 配置
* 首先需要创建一个github仓库，并在项目根目录下添加.travis.yml文件，输入一下内容：
  ```shell
  language: node_js
  script: 
    - npm run build
  ```

* 通过github授权登录 www.travis-ci.org网站，并在https://www.travis-ci.org/account/repositories页面激活刚刚创建的项目，如下图
![travis_setting_active](/images/travis/setting_active.png)
点击setting进行相应的配置


因为我们需要将项目部署到自己的服务器上，而travis ci的shell命令是不可交互式的命令，所以我们希望travis ci能自动登录到我们的服务器进行一些相关的操作，需要进行如下配置：
1、生成本地的ssh key: ssh-keygen -t rsa -C "xxxx@xxx.com"，此命令会在.ssh文件夹下生成你的ssh key
2、将.ssh文件夹下的id_rsa.pub文件的内容拷贝到github的ssh设置中去（push代码到github上的时候就不需要输入密码了）
3、使用命令`ssh root@xxx.xxx.xxx.xxx` 登录到自己的远程服务器上,在.ssh/authorized_keys中输入你的id_rsa.pub文件内容
4、接下来我们需要通过travis的加密功能将我们的id_rsa加密后自动上传到travis ci上
* 安装ruby(mac用户：brew install ruby)
* 安装travis: gem install travis，如果网络有问题，可以切换到国内源：gem sources --add https://gems.ruby-china.com/
* 使用`travis login --auto`进行登录,此处需要输入你的github用户名或密码，如果不放心的话，也可以使用`--github-token`的方式进行登录。如果命令行中看到`Successfully logged in as xxxxx!`的字样表示登录成功
* 在.ssh目录下的id_rsa文件拷贝到项目`根目录`下，执行如下命令：`travis encrypt-file id_rsa --add`，该命令在会在当前目录下生成一个文件`id_rsa.enc`,这个文件是需要提交到gitHub上的(原本的id_rsa文件不要提交到github上)，并会在travis上的该项目中添加`encrypted_xxxxx_iv`和`encrypted_xxx_key`两个key，且会在`.travis.yml`的before_install中添加`openssl aes-256-cbc -K $encrypted_xxx_key -iv $encrypted_xxx_iv -in id_rsa.enc -out id_rsa -d`命令

## .travis.yml文件
```shell
# 指定使用的语言
language: node_js
# 指定使用的nodejs的版本
node_js: stable
services:
- docker
addons:
  # host_ip是在travis中配置的环境变量
  ssh_known_hosts: "$host_ip"
# 只有hexo分支会触发构建
branches:
  only:
  - hexo
# 缓存
cache:
  directories:
  - node_modules
deploy:
  on:
    tags: true
# 执行install之前的需要执行的命令
before_install:
- openssl aes-256-cbc -K $encrypted_f217180e22ee_key -iv $encrypted_f217180e22ee_iv
  -in id_rsa.enc -out ~/.ssh/id_rsa -d
- chmod 600 ~/.ssh/id_rsa
# 设置ssh参数：StrictHostKeyChecking no ，保证ssh时命令不需要进行挂起操作
- echo -e "Host $host_ip\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config

install:
  - npm install

script:
- npm run build
- echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
- docker build -t michaelgongm/$DOCKER_NAME:latest .
- docker push michaelgongm/$DOCKER_NAME:latest
after_success:
- ssh root@$host_ip -o StrictHostKeyChecking=no "cd ~;docker-compose pull $DOCKER_NAME;docker-compose
  stop $DOCKER_NAME;docker-compose rm -f $DOCKER_NAME;docker-compose up -d $DOCKER_NAME;exit"
```
这样每次push时都会自动部署相应代码

[这里](https://github.com/MichaelGong/michaelgong.github.com/blob/hexo/.travis.yml)是我的项目的.travis.yml的配置
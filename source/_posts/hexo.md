---
title: 利用Hexo配置个人博客
date: 2017-09-05 23:28:46
tags: [hexo]
keywords: hexo
---
<!-- toc -->

## 一、介绍

Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

<div class="tip">官方网站：https://hexo.io</div>

## 二、安装工具

### 1. 安装Nodejs

可以访问Node官方网站下载：[https://nodejs.org](https://nodejs.org)，一般选择最新稳定版本下载安装就可以了。
或者可以先安装NVM[(https://github.com/creationix/nvm)](https://github.com/creationix/nvm)，然后可以通过NVM切换自己想要的node版本。
安装完毕后，可以通过在命令行中执行：`node -v` 来查看是否安装成功。

### 2. 安装git

可以去 [https://git-scm.com/](https://git-scm.com/) 下载相应系统的git版本直接安装就可以，或者如果有其他方案的话也可以选择，比如GUI界面的工具。
安装完成后，可以在命令行或者git bash中，输入`git version`，如果输出类似`git version 2.13.1`这样的文字说明你安装成功。

### 3. 安装hexo

接下来就可以安装hexo了，在命令行中执行`npm install -g hexo-cli`

## 三、建站
Hexo安装完成之后，就可以创建自己的网站了。
在你希望的目录下，依次执行以下命令：
> * hexo init blog
> * cd blog
> * npm install

命令会自动创建一个blog文件夹，并在blog文件夹内创建一些文件和文件夹，blog内的文件结构大致如下：
├── _config.yml      `网站的配置信息（大部分的配置都在这里）`
├── package.json     `应用程序的信息以及安装了的插件`
├── scaffolds        `模版 文件夹。当您新建文章时，Hexo 会根据指定的scaffold 来建立文件。`
├── source           `资源文件夹是存放用户资源的地方。`
|   ├── _drafts
|   └── _posts
└── themes           `主题文件夹。Hexo 会根据主题来生成静态页面。`

具体的设置可以查看 [官方网站](https://hexo.io/zh-cn/docs/)

## 四、hexo指令

当你创建项目的时候，其实你已经用到了一个hexo指令：`hexo init xxx`，这个指令可以帮你初始化一个hexo项目，hexo还有其他的一些常用指令：
> * hexo server  `启动一个端口为4000的本地服务启`，添加 -p 参数可以改变端口设置，如：hexo server -p 8787
> * hexo clean `清除缓存文件 (db.json) 和已生成的静态文件 (public)`
> * hexo new [layout] title `新建一篇文章。如果没有设置 layout 的话，默认使用 _config.yml 中的 default_layout 参数代替。如果标题包含空格的话，请使用引号括起来。` 如果你想添加一篇名为 美好的日子 的文章，可以：`hexo new 美好的日子`，如果你想创建一个名为 beautifulDay 的路由的话，可以：`hexo new page beautifulDay`
> * hexo generate `生成静态文件`，可以简写成 `hexo g`, `hexo generate --watch`这个命令可以监听文件变化并自动生成静态文件
> * hexo deploy `部署之前预先生成静态文件`，可以简写成 `hexo d`
> * hexo g -d 这个命令可以生成静态文件并将静态文件部署到相应位置


## 五、主题

你可以去 [这里](https://hexo.io/themes/) 选择自己喜欢的主题 或者 [这里](https://github.com/hexojs/awesome-hexo) 选择主题。
选择到自己喜欢的主题之后，就可以在blog目录下添加主题，具体操作如下（本站用的是anatole修改样式后的主题）：
> `git clone git@github.com:Ben02/hexo-theme-Anatole.git themes/anatole`

或者直接去github上下载，并把下载后的代码放在 `blog/themes` 下，并将文件夹命名为anatole(文件夹名字需要根据各自的主题名称命名，这里只是举例)。

然后需要修改blog下的`_config.yml`文件中的theme为：`theme:anatole`，
这样你的主题就生效了，如果需要自己修改主题样式的话，可以在themes/anatole下查找你需要修改的内容，并进行修改。
修改完毕后，可以执行`hexo server`，`hexo generate --watch` ，并在浏览器里访问http://localhost:4000/ 就可以看到效果了

## 六、利用github生成自己的网站


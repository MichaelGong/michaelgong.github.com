---
title: vscode中vue文件emmet进行tab不起作用
date: 2017-10-09 17:33:13
keywords:
tags:
categories: [vscode, vue, emmet]
summary:
---

vscode中中开发vue项目时，用到的.vue文件中，emmet的自动补全功能会失效，这时你需要在vscode中的：文件-首选项-设置，里添加
```
"emmet.triggerExpansionOnTab": true,
"emmet.includeLanguages": {
    "vue-html": "html",
    "vue": "html"
}
```
这样就可以正常使用emmet了。

参考：[https://segmentfault.com/q/1010000008680303/a-1020000008680726](https://segmentfault.com/q/1010000008680303/a-1020000008680726)
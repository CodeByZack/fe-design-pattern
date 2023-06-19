# FE Design Pattern

[patterns.dev](https://www.patterns.dev/) 是一个介绍前端设计模式的网站。

本项目所有内容 copy 自上述项目，只不过翻译成中文了。请尽量阅读英文原文。
## 技术栈

项目使用了 Astro + MDX + Codesandbox + Tailwindcss 进行搭建。

## 目录结构

`src/components` : 存放一些通用组件，如页面上的代码编辑器等

`src/pages/posts` : 存放 MDX 文件，一个文件就是一篇文章

`src/pages/layouts` : 存放页面的布局文件

`src/pages/sample-codes` : 存放页面上使用的样例代码，用于编辑器展示，使用

`public/videos` : 存放页面上使用的视频文件


## 添加新文章

在 `src/const/MenuList.ts` 找到还没翻译的文章，然后

在 `src/pages/posts` 下添加 `${postname}.mdx` 文件。文件名需与 `MenuList` 里的一致， 然后在头部添加

```markdown
---
layout: ../../layouts/PostLayout.astro
title: "文章名字"
description: "文章描述"
---
```

然后开始进行翻译。

代码编辑器可以使用 `<Editor client:idle files={SampleCodes3} />`

视频块可以使用 `<Video controls="" autoPlay src="/videos/proxy-1.webm" />`


### 其它

个人能力有限，如有错误，欢迎指出。
# PikPak 个人网页版

## 官方地址

 * [PikPak](https://mypikpak.com)

## Demo
 * [PikPak](https://mumuchenchen.github.io/pikpak/)


## 插件文档

* [v-contextmenu](https://github.com/heynext/v-contextmenu/blob/main/docs/usage.md)
* [UtoVRPlayer](https://note.youdao.com/ynoteshare/index.html?id=fd0b710c07ee0b207966324ec021fc89&type=note&_time=1637832739478)
* [naiveui](https://www.naiveui.com/zh-CN/os-theme/components/button)
## 安装部署

 * [网页版使用教程](https://www.tjsky.net/?p=220)

### 注册必须的账号
分别是`pikpak` `github` `cloudflare`，如果你已经都有了，请跳过这一步

### pikpak账号
使用官方的安卓客户端注册，没有安卓手机的，要么借一个手机，要么电脑上用模拟器，要么电脑上用第三方客户端注册吧。
PS：如果你最开始登录PIkPak客户端是用的谷歌账号关联登录，请在客户端内点击右下角图标，再点击左上角你的头像，修改密码/找回密码。

### GitHub
注册地址[https://github.com/signup](https://github.com/signup)
输入邮箱地址和密码，选择免费计划，验证邮箱地址，按照提示操作，创建您的个人帐户。
PS：如果你感觉部分内容是英文的识别困难，用浏览器的翻译功能吧。

### CloudFlare
注册地址[https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
输入您的电子邮箱地址和密码。单击 Create Account。
PS：CloudFlare有中文界面，在右上角切换

### Cloudflare Workers部署
登录你的Cloudflare
在主页右侧找到【Workers】
点进【Workers】选择一个预设的子域，点击【set up】之后，我们选择免费套餐。
点进【Workers】，选择【创建Workers】
把这里的代码[https://github.com/mumuchenchen/pikpak/blob/main/cf-worker/index.js](https://github.com/mumuchenchen/pikpak/blob/main/cf-worker/index.js) 粘贴到页面右侧的输入框
点击【保存并部署】按钮，
（非必须）单击你刚创建的Worker，选择重命名，起个好记好写的名字，比如pikpak
记住你的Worker的域名pikpak.XXXX.workers.dev之后要用到
### GitHub部署
Github Aciton
登录你的Github，并且进入项目[https://github.com/mumuchenchen/pikpak](https://github.com/mumuchenchen/pikpak)
点击右上角的【Fork】将项目复刻到你自己的仓库（除非你知道你在干什么，不然不要改仓库的名字）
点击上侧一排的最后一个按钮【settings】切换到设置页面
选择左侧的【secrets】项，点击【new repository secrets】
Name填CF_DOMAIN,Value填你Worker的域名pikpak.XXXX.workers.dev（注意只是域名本身，不带https://之类的累赘），点【Add secret】
点击上侧一排的【actions】按钮，点【I understand my workdlows, go ahead and enable them】表示你明白你要干啥。
点击左侧的【deploy】，点右侧的【Run workflow ▽】切换到main分支，选择绿色的【Run workflow】 按钮。等待代码被构架并运行，如果没出什么问题，你会看到一个绿色√出现。（不超过5分钟）
### Github Page
再次点击上侧那一排按钮中最后的【settings】切换到设置页面
这次选择左侧的【pages】
把Source这一项的branch切换到【gh-pages】【/(root)】，然后点击保存。
等1分钟左右你就可以通过页面上部显示的
`Your site is published at https://tjsky.github.io/pikpak/`
访问你的PikPak网页版客户端了。
后期更新
因为网页版还在不断的迭代中，上游代码更新后，如果你希望更新，那么需要这样更新一下

### 更新正常流程
回到你的Github主页（https://github.com/）切换到项目。
点击【Fetch upsteam ▽】，如果上游有更新，【Fetch and merge】按钮会是可点击的，选择【Fetch and merge】。
正常来说，没自己改过文件，就不会出问题，Github Aciton会自动重新deploy，在几分钟内就更新好了。如果出现无法合并，deploy时出错等等问题，要么自己介入处理导致了报错的文件，要么用更新出错时流程更新吧。
PS：只需合并main分支即可，不需要合并gh-pages分支，合并main后deploy会更新gh_pages分支内容。
检查一下[https://github.com/mumuchenchen/pikpak/blob/main/cf-worker/index.js](https://github.com/mumuchenchen/pikpak/blob/main/cf-worker/index.js) 在你部署后有没有更新过，如果有更新，将更新后的代码，更新到你的Workers中，重新部署Workers

### 更新出错时流程
这个操作不是最简单的，但是是最不容易出错的方式

首先注意一下[https://github.com/mumuchenchen/pikpak/blob/main/cf-worker/index.js](https://github.com/mumuchenchen/pikpak/blob/main/cf-worker/index.js) 在你部署后有没有更新过，如果有更新，将更新后的代码，更新到你的Workers中，重新部署Workers（或者就直接不管是否更新，就直接无脑复制过去重新部署）
回到你的Github主页（https://github.com/）切换到项目，选择【settings】，拉到底，在Danger Zone中找到【Delete this repository】，在输入框中输入他要求的`XXXX/pikpak`删除整个仓库。
然后重新执行一遍 GitHub部署 操作
一些可能需要你注意的东西
1. 没必要绑定自己的域名，用github.io就好，github的那个绑定咋说呢，广播的有点慢。进行绑定子域时，站点会有不短的一段时间都无法访问，尤其是在你设置了HTTPS时。
2. 不要在设置里修改仓库名，保持是`XXXX/pikpak`，除非你能知道怎么改代码中的路径（需要改一下vite.config.ts里第八行的相关部分）
3. Cloudflare Workers是有限制的，免费计划每分钟最多1000次请求，每天最多10W次请求，超了就会报错。
4. 这个的部署方式非常多，比如你可以用cloudflare page代替GitHub page部署网站，可以用自己的服务器，替代Cloudflare Workers去做反代。。。等等很多方式。

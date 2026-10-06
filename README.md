# Pink Diary · 个人博客

这是一个无需框架、可直接部署的静态个人博客模板。

## 1. 修改个人信息
打开 `index.html`，搜索并替换：
- `这里写你的名字 / ID`
- 邮箱 `YOUR_EMAIL@example.com`
- QQ `YOUR_QQ`
- Twitter/X `YOUR_TWITTER`
- YouTube `YOUR_CHANNEL`

## 2. 嘉然主视觉
首页右侧使用 LAPLACE 提供的 Bilibili 头像代理作为默认图片：
`https://workers.vrp.moe/bilibili/avatar/672328094?size=480`
点击整块图片会进入嘉然 Bilibili 主页。

如果你想放一张更大的嘉然立绘/壁纸，把自己的图片命名为 `assets/jiaran.jpg`，然后把 `index.html` 中 hero 图片的 src 改成 `assets/jiaran.jpg` 即可。

## 3. 音乐播放器
点击“添加本地音乐”即可把电脑里的 MP3/FLAC/OGG 等音频加入当前页面的播放列表。
这些音乐不会上传服务器，只在当前浏览器会话中播放。

## 4. V圈喜好表
默认只有浏览权限。
点击“管理员模式”并输入默认密码：
`change-me-2026`

注意：这是纯前端模板，所以密码不能当作真正的服务器安全认证。任何人拿到网页源码都能看到它。
如果以后需要“只有我登录账号才能编辑，并且编辑结果所有访客都能看到”，需要接入 Supabase/Firebase/自己的后端数据库。

当前编辑结果会保存在浏览器 localStorage；也可以使用“导出 JSON / 导入 JSON”管理数据。

## 5. AI 区
已放入：
- ChatGPT
- Gemini
- DeepSeek
- Kimi
- 豆包

链接使用各自官方网页。

## 6. 部署
最简单：
- GitHub Pages
- Cloudflare Pages
- Vercel
- Netlify

上传整个文件夹即可，不需要 Node.js。

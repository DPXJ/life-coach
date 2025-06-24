# Life Coach AI - 个人成长辅导

## 项目简介
这是一个基于DeepSeek R1 API开发的个人成长辅导网站。通过与AI进行对话，用户可以获得个性化的建议和指导，帮助个人成长。

## 功能特性
- 🤖 AI驱动的个人成长辅导
- 💬 实时对话交互
- 📱 响应式设计，支持移动端
- 🎨 现代化UI界面
- 🔒 隐私保护

## 本地开发

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 环境配置
1. 复制 `.env.example` 文件为 `.env`
2. 在 `.env` 文件中配置您的 DeepSeek API 密钥：
```
DEEPSEEK_API_KEY=your_api_key_here
```

### 启动开发服务器
```bash
npm start
```

访问 http://localhost:3000 查看应用。

## GitHub Pages 部署

### 自动部署
项目已配置 GitHub Actions 自动部署到 GitHub Pages：

1. 推送代码到 `main` 或 `master` 分支
2. GitHub Actions 会自动构建并部署到 GitHub Pages
3. 访问 `https://your-username.github.io/life-coach` 查看部署的网站

### 手动设置 GitHub Pages
如果您想手动设置：

1. 进入 GitHub 仓库设置
2. 找到 "Pages" 选项
3. 选择 "Deploy from a branch"
4. 选择 `gh-pages` 分支
5. 保存设置

### 静态版本说明
GitHub Pages 版本使用 `index-gh-pages.html` 作为主页面，这是一个纯静态版本，不依赖后端服务器。AI回复功能通过预设的回复模板实现。

## 项目结构
```
life-coach/
├── index.html              # 完整版本（需要后端服务器）
├── index-gh-pages.html     # GitHub Pages 静态版本
├── server.js               # Express 服务器
├── package.json            # 项目配置
├── .github/workflows/      # GitHub Actions 配置
└── README.md              # 项目说明
```

## 技术栈
- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **后端**: Node.js, Express.js
- **AI API**: DeepSeek R1
- **部署**: GitHub Pages, GitHub Actions

## 贡献
欢迎提交 Issue 和 Pull Request！

## 许可证
ISC License
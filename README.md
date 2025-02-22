# Life Coach AI 个人成长辅导网站

## 项目简介
这是一个基于DeepSeek R1 API开发的个人成长辅导网站。通过与AI进行对话，用户可以获得个性化的建议和指导，帮助个人成长。

## 版本信息
当前版本：V1.0
发布日期：2024年1月

## 安装步骤
1. 克隆项目到本地
```bash
git clone [项目地址]
cd life-coach
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
对于本地开发：
- 创建 `.env` 文件
- 添加 DeepSeek API 密钥：
```
DEEPSEEK_API_KEY=你的API密钥
```

对于Vercel部署：
1. 在Vercel项目设置中添加环境变量
2. 添加名为 `DEEPSEEK_API_KEY` 的环境变量
3. 将你的API密钥设置为该环境变量的值

## 部署指南
### Github部署
1. 创建新的Github仓库
2. 初始化本地git仓库：
```bash
git init
```
3. 添加并提交文件：
```bash
git add .
git commit -m "Initial commit"
```
4. 添加远程仓库并推送：
```bash
git remote add origin 你的Github仓库地址
git push -u origin main
```

### Vercel部署
1. 在Vercel上导入Github仓库
2. 在项目设置中配置环境变量 `DEEPSEEK_API_KEY`
3. 部署完成后，Vercel会自动生成一个可访问的URL

4. 启动服务器
```bash
npm start
```

## 使用说明
1. 打开浏览器访问 `http://localhost:3000`
2. 在对话框中输入你的问题或困扰
3. AI助手会根据你的具体情况提供个性化的建议和指导

## 注意事项
- 使用前请确保已正确配置 DeepSeek API 密钥
- 建议使用现代浏览器访问以获得最佳体验
- 保持网络连接稳定以确保对话流畅

## 功能特点
- 实时对话：与AI助手进行实时对话交流
- 个性化建议：根据用户的具体情况提供针对性的建议
- 响应式设计：适配各种设备的显示效果

## 技术架构
### 前端部分
- 使用HTML5和CSS3构建用户界面
- 采用Flexbox布局实现响应式设计
- 简洁直观的对话界面设计

### 后端部分
- Node.js服务器处理API请求
- 集成DeepSeek R1 API
- 处理跨域(CORS)问题

## 页面结构
### 主页面 (index.html)
- 顶部：网站标题和简介
- 中部：对话界面
  - 消息显示区域
  - 输入框和发送按钮
- 底部：基本信息

### 样式设计
- 使用柔和的配色方案
- 清晰的视觉层次
- 良好的间距和留白

## 开发规范
- 遵循W3C标准
- 使用语义化HTML标签
- 添加详细的中文注释
- 确保代码的可维护性和可读性
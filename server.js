require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');

const app = express();
// 从环境变量获取端口，默认为3000
const port = process.env.PORT || 3000;

// 启用CORS和JSON解析中间件
app.use(cors());
app.use(express.json());

// 配置静态文件服务
app.use(express.static(path.join(__dirname)));

// 处理根路径请求
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// DeepSeek R1 API配置
const API_KEY = process.env.DEEPSEEK_API_KEY;
const API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';

// 验证必要的环境变量
if (!API_KEY || API_KEY === 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
    const errorMessage = process.env.VERCEL 
        ? '在Vercel环境中运行，请在项目设置中配置有效的DEEPSEEK_API_KEY环境变量' 
        : '在本地环境运行，请在.env文件中配置有效的DEEPSEEK_API_KEY环境变量';
    console.error('错误：API密钥无效或未正确配置');
    console.error(errorMessage);
    throw new Error(errorMessage);
}

// 系统提示词，定义AI助手的角色
const SYSTEM_PROMPT = `你是一位专业的生活教练，擅长通过对话帮助人们进行个人成长。
你应该：
1. 认真倾听用户的问题和困扰
2. 提供具体、可行的建议和解决方案
3. 鼓励和支持用户的成长进步
4. 保持专业、积极的态度
5. 注意保护用户的隐私信息`;

// 处理聊天请求的路由
app.post('/chat', async (req, res) => {
    try {
        if (!API_KEY || API_KEY === 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
            const errorMsg = process.env.VERCEL 
                ? '未配置有效的API密钥，请在Vercel项目设置中添加正确的DEEPSEEK_API_KEY环境变量' 
                : '未配置有效的API密钥，请在.env文件中添加正确的DEEPSEEK_API_KEY环境变量';
            throw new Error(errorMsg);
        }
        
        if (!req.body || !req.body.message) {
            throw new Error('缺少必要的消息内容');
        }

        const userMessage = req.body.message;
        console.log('收到用户消息:', userMessage);

        // 准备请求数据
        const requestData = {
            model: 'deepseek-r1-250120',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: userMessage }
            ],
            temperature: 0.6,
            stream: false
        };
        console.log('准备发送到API的数据:', JSON.stringify(requestData));

        // 设置请求选项
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(requestData),
            timeout: 60000 // 60秒超时
        };

        // 发送请求到DeepSeek API
        const response = await fetch(API_URL, requestOptions);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API响应错误:', {
                status: response.status,
                statusText: response.statusText,
                errorText
            });
            let errorMessage = `API请求失败: ${response.status}`;
            if (response.status === 401) {
                errorMessage = 'API密钥无效或已过期，请更新DEEPSEEK_API_KEY配置';
            } else if (response.status === 403) {
                errorMessage = 'API密钥权限不足或格式错误，请检查DEEPSEEK_API_KEY格式是否正确';
            }
            throw new Error(errorMessage);
        }

        // 处理API响应
        let data;
        let responseText;
        try {
            // 记录响应状态和头信息
            console.log('API响应状态:', response.status);
            console.log('API响应头:', JSON.stringify([...response.headers]));
            
            responseText = await response.text();
            console.log('API原始响应:', responseText);
            
            // 检查响应文本是否为空
            if (!responseText || !responseText.trim()) {
                throw new Error('API返回了空响应');
            }
            
            try {
                // 尝试解析JSON，添加更多错误信息
                data = JSON.parse(responseText);
                console.log('成功解析JSON响应');
            } catch (parseError) {
                console.error('JSON解析错误:', parseError);
                console.error('原始响应文本:', responseText);
                console.error('响应内容长度:', responseText.length);
                console.error('响应前50个字符:', responseText.substring(0, 50));
                throw new Error(`JSON解析失败: ${parseError.message}. 响应长度: ${responseText.length}`);
            }

            // 验证响应数据结构
            if (!data || typeof data !== 'object') {
                throw new Error('API响应不是有效的对象');
            }
            
            if (!Array.isArray(data.choices)) {
                throw new Error('API响应缺少choices数组');
            }
            
            if (!data.choices[0] || typeof data.choices[0].message !== 'object') {
                throw new Error('API响应choices数组格式无效');
            }
            
            if (typeof data.choices[0].message.content !== 'string') {
                throw new Error('API响应message.content不是字符串');
            }
            
        } catch (error) {
            console.error('API响应处理错误:', error);
            console.error('错误类型:', error.constructor.name);
            console.error('错误堆栈:', error.stack);
            throw new Error('API响应处理失败：' + (error.message || '未知错误'));
        }

        console.log('解析后的API响应:', JSON.stringify(data));

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error('无效的API响应格式:', data);
            throw new Error('API响应格式不正确');
        }

        const reply = data.choices[0].message.content;
        console.log('发送回复给用户:', reply);
        res.json({ reply });
    } catch (error) {
        console.error('处理请求时发生错误:', error);
        const errorMessage = error.message || '未知错误';
        res.status(500).json({
            error: '服务器内部错误',
            message: errorMessage,
            timestamp: new Date().toISOString()
        });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
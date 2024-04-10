const OpenAI = require("openai");

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	baseURL: "https://api.chatanywhere.com.cn/v1",
});
module.exports = { openai }
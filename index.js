require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const domain = process.env.DOMAIN;

// Захватывает IP или домен после "@"
const ipOrDomainRegex = /@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?:\d{1,3}\.){3}\d{1,3})/g;

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text?.trim();

    if (!text) return;

    if (text.startsWith("vless://") || text.startsWith("vmess://")) {
        const result = text.replace(ipOrDomainRegex, `@${domain}`);
        bot.sendMessage(chatId, result);
    } else {
        bot.sendMessage(chatId, `⚠️ Отправь ссылку vless:// или vmess:// для замены IP или домена на ${domain}.`);
    }
});
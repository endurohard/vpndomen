require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const domains = process.env.DOMAINS?.split(',') || ['yourdomain.com']; // список доменов через запятую

// регулярка, чтобы найти домен или IP в ссылке (vless, vmess, trojan)
const urlRegex = /(@)([a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}|(?:\d{1,3}\.){3}\d{1,3})(?=[:\/])/g;

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text?.trim();

    if (!text) return;

    const isLink = text.startsWith('vless://') || text.startsWith('vmess://') || text.startsWith('trojan://');

    if (isLink) {
        const chosenDomain = domains[Math.floor(Math.random() * domains.length)];
        const result = text.replace(urlRegex, (_, at, host) => `@${chosenDomain}`);
        bot.sendMessage(chatId, result);
    } else {
        bot.sendMessage(chatId, `⚠️ Отправь ссылку vless://, vmess:// или trojan:// для замены IP/домена.`);
    }
});
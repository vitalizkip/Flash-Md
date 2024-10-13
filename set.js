const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0lua2tmbVZZNkt6MEhWa2hHTjVnZUNrZUNmTVdKVHJYZGdQTzFMVUZVVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTVBvWmpwdElPUzY3Zmx0QTcrWTVsUGtrL0xSb2pTdkIyQUU0aWtTdnNIcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0TENKaVlzRlpTK3hsSlFBbTluMWlEVHdmcnFNclV2a0tuL3ovQU15REZvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxUVhiUU1oZHZwK0g1cVlGaUJOMkRqZVk2TVdBbHhYbk9EdWF2SWZneHpnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVOeE54VW9CL25lS0l4NkhRK3lEa2hPTzM0VmlLL0pZNURML3g1azNSbXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inl0TUR6SmNOY2pQbklqNjQvQXN1VnFJQzAySlhISlFtQUFWOTZKOVYwM1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUpmTkhUNEN0cWZ6cXFKcnNJYXZsNUJPcWVIWVJ4M21tTFVMWVlrNjEzbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVp1aSs2a1JLNFpUYkpyL29xYU9iQTU5dXNqK0tLQ0lsZERWSnpHTGdIbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9GQzhFL1RydzhUNmNZeUhOUEc1TzI5ODlkbVJObmx5dUtmTjlNL3NKRjF3VVdhdVBUcEFTeEQxMklaQjhHeGRVQXhVaWZmZE95d3M5NmVBaXUwOWlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAyLCJhZHZTZWNyZXRLZXkiOiJjeEp3WTc2Q1Z2NENBbEVwY1Q0QVF1RWUwYXFGbitwUkhyYUtCTUttazFNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc1MTc2NzI3MEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyMzRFMDQ2NjdFQjEwRDgxNzA4MUJENTBDRjYzMkQ2NyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI4ODIzOTc2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3NTE3NjcyNzBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODUzRkI1Qzg5RTMyNDU5QTAwRkY4MUE2NEFBNzdCNTQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyODgyMzk3Nn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiYkNodm9vTUVTVENmaEhkRkVoUm1DUSIsInBob25lSWQiOiI5OGFkMmIwOC0wZGRkLTQwNDYtYjc5MC0zMDhkYjcyMGFhNjUiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOVcycVoySktUQ3gyWkRuTnA1d3RSZFFpOGFBPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZyc1pabWI0Y1RVNlhtSzJoNC9HcmZ5YnBWQT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJCNEU0WlEyRyIsIm1lIjp7ImlkIjoiMjU0NzUxNzY3MjcwOjNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiS2lkZG8ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01UbmtLWUZFSmFGcjdnR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InZ5SzlaamFpUmNRK29jRmpoZDZLTFowRkNPYTd5ck1aaXJUMUVhdUdpdzg9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik1lRWFLeWhjMWNJM3dZZTRubUFtYWlmOTR1d3lRSkN5Wk41SkllRFV6MEFHYU9Dd2pUakVpNEk3NTIrTEVyTTV5N3ZQS2hUNTcrSHA4VjRDR1NGOUNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ4TE95VlRWMGl5NW5NWmpMS29zWnBLVXNCTDlCMUJLM1dqNHhxWlNCekgzdVJyYWVBY2xZSDVNbkd4UFhyZVlmOXRuUWhFRFY1TGRCTFJYVkFnU3FpQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc1MTc2NzI3MDozQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmI4aXZXWTJva1hFUHFIQlk0WGVpaTJkQlFqbXU4cXpHWXEwOVJHcmhvc1AifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjg4MjM5NzMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQXZxIn0=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Savage",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254751767270",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

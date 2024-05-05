import fs from "fs";
import { GatewayIntentBits, Client } from "discord.js";
import dotenv from "dotenv";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import cron from "node-cron";
import yaml from "js-yaml";
import { Data } from "./@types/data";

// dotenv初期化
dotenv.config();

// day.jsのTimezone機能を有効化
dayjs.extend(utc);
dayjs.extend(timezone);

// discord.jsクライアント
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once("ready", () => {
  console.log(`Ready: ${client.user?.tag}`);

  cron.schedule("0 * * * * *", () => {
    const yamlText = fs.readFileSync(process.env.DATA_PATH, "utf8");
    const data = yaml.load(yamlText) as Data;

    const now = dayjs().tz("Asia/Tokyo");
    const nowDay = now.startOf("day");
    const doomsday = dayjs(data.doomsday);
    const leftDays = doomsday.diff(nowDay, "day");

    const nickname = `${leftDays}日後に${data.action}${data.name}`;

    console.log(
      `[${now.format("YYYY-MM-DDTHH:mm:ss")}] Change nickname: ${nickname}`
    );
    client.guilds.cache
      .get(process.env.GUILD_ID)
      ?.members.me?.setNickname(nickname);
  });
});

client.login(process.env.TOKEN);

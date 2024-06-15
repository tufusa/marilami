import fs from "fs";
import { GatewayIntentBits, Client, Message } from "discord.js";
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
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Ready: ${client.user?.tag}`);

  cron.schedule("0 0 0 * * *", async () => {
    const yamlText = fs.readFileSync(process.env.DATA_PATH, "utf8");
    const data = yaml.load(yamlText) as Data;

    const now = dayjs().tz("Asia/Tokyo");
    const nowDay = now.startOf("day");
    const doomsday = dayjs(data.doomsday);
    const leftDays = doomsday.diff(nowDay, "day");
    const timestamp = `[${now.format("YYYY-MM-DDTHH:mm:ss")}]`;

    const nickname = `${leftDays}日後に${data.action}${data.name}`;

    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    if (!guild) {
      console.log(`${timestamp} Error: Guild not found`);
      return;
    }

    const channel = client.channels.cache.get(process.env.CHANNEL_ID);
    if (!channel) {
      console.log(`${timestamp} Error: Channel not found`);
      return;
    }
    if (!("send" in channel)) {
      console.log(`${timestamp} Error: Cannot send at this channel`);
      return;
    }

    await guild.members.me?.setNickname(nickname);
    console.log(`${timestamp} Change nickname: ${nickname}`);

    const message = `${data.name}が${data.action}まであと${leftDays}日です`;
    await channel.send(message);
    console.log(`${timestamp} Send message: ${message}`);
  });
});

client.on("messageCreate", (message: Message) => {
  if (message.author.bot) return;

  if (message.content.includes("結婚")) {
    console.log("結婚");
    message.channel.send("🦀「えっもう結婚するの！？」");
  }
});

client.login(process.env.TOKEN);

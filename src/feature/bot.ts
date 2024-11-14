import { Client } from "@poporonnet/discord-pure";
import dotenv from "dotenv";
import { getDate, getNow } from "./dayjs";
import { log } from "./log";

// dotenv初期化
dotenv.config();

const client = new Client(process.env.TOKEN);

const doomsday = getDate(process.env.DOOMSDAY);

export const update = async () => {
  const nowDay = getNow().startOf("day");
  const leftDays = doomsday.diff(nowDay, "day");

  const nickname = `${leftDays}日後に${process.env.ACTION}${process.env.NAME}`;

  client.guild
    .modifyCurrentMember(process.env.GUILD_ID, {
      nick: nickname,
    })
    .then(() => log(`Change nickname: ${nickname}`));

  const message = `${process.env.NAME}が${process.env.ACTION}まであと${leftDays}日です`;
  client.message
    .create(process.env.CHANNEL_ID, { content: message })
    .then(() => log(`Send message: ${message}`));
};

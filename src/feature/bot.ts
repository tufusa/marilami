import { Client } from "@poporonnet/discord-pure";
import type { Env } from "../main";
import { getDate, getNow } from "./dayjs";
import { log } from "./log";
import { primeMessage } from "./primeMessage";

export const update = async (env: Env) => {
  const client = new Client(env.TOKEN);

  const nowDay = getNow().startOf("day");
  const doomsday = getDate(env.DOOMSDAY);
  const leftDays = doomsday.diff(nowDay, "day");

  const nickname = `${leftDays}日後に${env.ACTION}${env.NAME}`;
  const changeNickname = client.guild
    .modifyCurrentMember(env.GUILD_ID, {
      nick: nickname,
    })
    .then(() => log(`Change nickname: ${nickname}`));

  const message =
    `${env.NAME}が${env.ACTION}まであと${leftDays}日です\n` +
    `- ${primeMessage(leftDays)}`;
  const createMessage = client.message
    .create(env.CHANNEL_ID, { content: message })
    .then(() => log(`Send message: ${message}`));

  return Promise.all([changeNickname, createMessage]);
};

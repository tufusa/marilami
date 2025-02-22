import { Client } from "@poporonnet/discord-pure";
import { getDate, getNow } from "./dayjs";
import { fortuneMessage } from "./fortuneMessage";
import { log } from "./log";
import { niceRoundDateMessage } from "./niceRoundDateMessage";
import { niceRoundDayMessage } from "./niceRoundDayMessage";
import { primeMessage } from "./primeMessage";

export const update = async (env: Env): Promise<void> => {
  const client = new Client(env.TOKEN);

  const nowDay = getNow().startOf("day");
  const doomsday = getDate(env.DOOMSDAY).startOf("day");
  const leftDays = doomsday.diff(nowDay, "day");

  const nickname = `${leftDays}日後に${env.ACTION}${env.NAME}`;
  const changeNickname = client.guild
    .modifyCurrentMember(env.GUILD_ID, {
      nick: nickname,
    })
    .then(() => log(`Change nickname: ${nickname}`));

  const subMessage = [
    primeMessage(leftDays),
    fortuneMessage(env.NAME, env.ACTION),
    niceRoundDayMessage(env.NAME, env.ACTION, env.ACTION_EUPHONIC_TE, leftDays),
    niceRoundDateMessage(
      env.NAME,
      env.ACTION,
      env.ACTION_EUPHONIC_TE,
      nowDay,
      doomsday
    ),
  ]
    .filter((msg) => msg)
    .map((msg) => `- ${msg}`)
    .join("\n");
  const message = `### ${env.NAME}が${env.ACTION}まであと${leftDays}日です\n${subMessage}`;
  const createMessage = client.message
    .create(env.CHANNEL_ID, { content: message })
    .then(() => log(`Send message: ${message}`));

  await Promise.all([changeNickname, createMessage]);
};

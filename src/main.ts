import { getDate } from "./feature/dayjs";
import { getClock } from "./feature/getClock";
import { log } from "./feature/log";

log("Marilami is up");

const handler: ExportedHandler<Env> = {
  fetch: async (_controller, env) => {
    await getClock(env).refresh();
    const currentAlarm = await getClock(env).currentAlarm();
    const nextDate = currentAlarm
      ? getDate(currentAlarm).format("YYYY-MM-DDTHH:mm:ss.SSS")
      : undefined;
    return new Response(`Marilami is up.\nNext: ${nextDate ?? "none"}`);
  },
  scheduled: async (_controller, env) => {
    await getClock(env).refresh();
  },
};

export { Clock } from "./feature/clock";
export default handler;

import { update } from "./bot";
import { getNow } from "./dayjs";
import { getNextCron } from "./getNextCron";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const updateOrDelay = async (env: Env): Promise<void> => {
  const now = getNow();
  const next = getNextCron(env.CRON);
  const diffMs = next.diff(now, "millisecond");

  if (diffMs < env.MAX_DELAY_MS) {
    await sleep(diffMs);
    return await update(env);
  }

  await sleep(env.MAX_DELAY_MS);
  return env.SELF.updateOrDelay();
};

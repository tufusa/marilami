import CronExpressionParser from "cron-parser";
import { getDate, getNow } from "./dayjs";

export const delay = async (env: Env): Promise<void> => {
  const now = getNow();
  const next = CronExpressionParser.parse(env.CRON).next();
  next.setMilliseconds(0);
  const nextCron = getDate(next.toDate());
  const nextCronDiffMs = nextCron.diff(now, "millisecond");
  if (nextCronDiffMs > 29 * 1000) return;

  await new Promise((resolve) => setTimeout(resolve, nextCronDiffMs));
};

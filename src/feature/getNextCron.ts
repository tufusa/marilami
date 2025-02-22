import CronExpressionParser from "cron-parser";
import type { Dayjs } from "dayjs";
import { getDate } from "./dayjs";

export const getNextCron = (cron: string): Dayjs => {
  const next = CronExpressionParser.parse(cron).next();
  next.setMilliseconds(0);
  return getDate(next.toDate());
};

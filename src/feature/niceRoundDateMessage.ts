import type { Dayjs } from "dayjs";

export const niceRoundDateMessage = (
  name: string,
  action: string,
  actionEuphonicTe: string,
  nowDay: Dayjs,
  doomsday: Dayjs
): string | undefined => {
  const isPast = nowDay.isAfter(doomsday);
  const compareDay = isPast ? nowDay.subtract(1, "day") : nowDay.add(1, "day");

  const leftYears = doomsday.diff(nowDay, "year");
  const isYearChanged = doomsday.diff(compareDay, "year") !== leftYears;
  const yearDiff = Math.abs(leftYears);

  if (isYearChanged) {
    return isPast
      ? `**${name}が${actionEuphonicTe}から今日でちょうど${yearDiff}年です**:confetti_ball:`
      : `**${name}が${action}まであとちょうど${yearDiff}年です**:comet:`;
  }

  const leftMonths = doomsday.diff(nowDay, "month");
  const isMonthChanged = doomsday.diff(compareDay, "month") !== leftMonths;
  const monthDiff = Math.abs(leftMonths);

  if (isMonthChanged) {
    return isPast
      ? `**${name}が${actionEuphonicTe}から今日でちょうど${monthDiff}ヶ月です**:tada:`
      : `**${name}が${action}まであとちょうど${monthDiff}ヶ月です**:fire:`;
  }
};

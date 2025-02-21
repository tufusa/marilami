export const niceRoundDayMessage = (
  name: string,
  action: string,
  actionEuphonicTe: string,
  leftDays: number
): string | undefined => {
  const dayDiff = Math.abs(leftDays);
  const isPast = leftDays < 0;

  if (leftDays % 100 !== 0) return;

  if (dayDiff === 0) {
    return `**${name}が${action}のは今日です**:exclamation::exclamation::exclamation::exclamation:`;
  }
  return isPast
    ? `**${name}が${actionEuphonicTe}から今日でちょうど${dayDiff}日です**:zap:`
    : `**${name}が${action}まであとちょうど${dayDiff}日です**:zap:`;
};

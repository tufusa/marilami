import { primeFactorize } from "./primeFactorize";

export const primeMessage = (leftDays: number): string => {
  const dayDiff = Math.abs(leftDays);
  const factors = primeFactorize(dayDiff);

  if (dayDiff === 0 || dayDiff === 1) {
    return `${dayDiff}は素数でも合成数でもありません…`;
  }
  if (factors.length === 1 && factors[0][1] === 1) {
    return `${dayDiff}は素数です！`;
  }

  const expression = factors
    .map(([base, exp]) => `${base}${exp === 1 ? "" : `^${exp}`}`)
    .join(" x ");
  return `${dayDiff}は\`${expression}\`です。`;
};

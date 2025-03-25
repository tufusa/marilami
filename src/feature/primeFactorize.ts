type Factors = [base: number, exponent: number][];

export const primeFactorize = (value: number): Factors => {
  if (value === 1) return [[1, 1]];

  let x = value;
  const factors: [number, number][] = [];
  const prs = [2, 3, 5];
  const inc = [4, 2, 4, 2, 4, 6, 2, 6];
  const prsLen = prs.length;
  const incLen = inc.length;

  for (let i = 0, count = 0, p = prs[i]; i < prsLen; p = prs[++i], count = 0) {
    for (; x >= p && x % p === 0; count++, x /= p);
    if (count > 0) factors.push([p, count]);
  }

  for (let i = 0, count = 0, d = 7; d * d <= x; d += inc[i++], i %= incLen, count = 0) {
    for (; x >= d && x % d === 0; count++, x /= d);
    if (count > 0) factors.push([d, count]);
  }

  if (x > 1) factors.push([x, 1]);
  return factors;
};

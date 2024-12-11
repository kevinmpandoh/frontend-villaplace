const distributePercentages = (values: number[]): number[] => {
  const total = values.reduce((sum, val) => sum + val, 0);

  if (total === 0) {
    return values.map(() => 0);
  }
  const percentages = values.map((val) => (val / total) * 100);
  const rounded = percentages.map(Math.round);
  const diff = 100 - rounded.reduce((sum, val) => sum + val, 0);

  for (let i = 0; i < Math.abs(diff); i++) {
    const index =
      diff > 0
        ? percentages.findIndex((val, idx) => rounded[idx] < Math.round(val))
        : percentages.findIndex((val, idx) => rounded[idx] > Math.round(val));
    if (index !== -1) {
      rounded[index] += diff > 0 ? 1 : -1;
    }
  }

  return rounded;
};

export default distributePercentages;

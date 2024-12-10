export const calculateMonthlyReceive = (
  amount: number,
  percent: number,
  apr: number,
): number => {
  if (amount <= 0 || percent <= 0 || apr <= 0) return 0

  return (amount * apr) / (100 * 12)
}

export function shortenWallet(wallet: string): string {
  return `${wallet.slice(0, 5)}...${wallet.slice(-5)}`
}

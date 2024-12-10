import { Chain, createPublicClient, http } from "viem"

export const waitForTransaction = async (hash: `0x${string}`, chain: Chain) => {
  const publicClient = createPublicClient({
    chain,
    transport: http(),
  })

  await publicClient.waitForTransactionReceipt({
    hash,
  })
}

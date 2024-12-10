import { useSignMessage } from 'wagmi'

export const useCreateSignature = () => {
  const timestamp = Date.now().toString()
  const { signMessageAsync } = useSignMessage()

  return async () => {
    let signature
    try {
      signature = await signMessageAsync({
        message: timestamp,
      })
    } catch (error) {
      console.log(error)
    }

    return { signature, timestamp }
  }
}

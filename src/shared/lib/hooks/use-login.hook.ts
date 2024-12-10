import { useSignInMutation, useSignUpMutation } from '@shared/api'
import { AuthStatusEnum } from '@shared/lib/enums'
import { useAuthStore } from '@shared/lib/stores'
import { getTokens } from '@shared/lib/utils'
import { useAccount } from 'wagmi'

// import { useCreateSignature } from './use-create-signature.hook'

export const useLogin = () => {
  // const createSignature = useCreateSignature()
  const { isConnected, address } = useAccount()
  // const { disconnect } = useDisconnect()
  const { mutateAsync: signUp } = useSignUpMutation()
  const { mutateAsync: signIn } = useSignInMutation()
  const { storeLogin, setAuthStatus } = useAuthStore()
  const existingTokens = getTokens()

  return async () => {
    setAuthStatus(AuthStatusEnum.PENDING)

    if (existingTokens && isConnected) {
      storeLogin()
      return
    }

    if (!isConnected) {
      setAuthStatus(AuthStatusEnum.NOT_AUTH)
      return
    }

    // const { signature, timestamp } = await createSignature()
    // if (!signature) {
    //   setAuthStatus(AuthStatusEnum.ERROR)
    //   disconnect()
    //   return
    // }

    try {
      const signUpResponse = await signUp({ publicAddress: address || '' })
      if (signUpResponse.status === 201) {
        await signIn({ publicAddress: address || '' })
        storeLogin()
      }
    } catch (error: any) {
      if (
        error?.response?.status === 400 &&
        error?.response?.data?.error === 'User already registered!'
      ) {
        await signIn({ publicAddress: address || '' })
        storeLogin()
      } else {
        setAuthStatus(AuthStatusEnum.ERROR)
      }
    }
  }
}

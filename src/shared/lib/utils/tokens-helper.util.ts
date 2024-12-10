import type { AuthTokensDto } from '@api/data-contracts'

const LS_TOKENS_KEY = 'listokens'

export const getTokens = (): AuthTokensDto | null => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage?.getItem(LS_TOKENS_KEY as string) as string)
  }
  return null
}

export const setTokens = (tokens: AuthTokensDto) => {
  localStorage.setItem(LS_TOKENS_KEY as string, JSON.stringify(tokens))
}

export const removeTokens = () => {
  localStorage.removeItem(LS_TOKENS_KEY as string)
}

export const getAccessToken = (): string | null => {
  const tokens = getTokens()
  return tokens?.accessToken || null
}

export const getRefreshToken = (): string | null => {
  const tokens = getTokens()
  return tokens?.refreshToken || null
}

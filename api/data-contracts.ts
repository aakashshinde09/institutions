/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface NGOLookup {
  id: number
  graphId: string
  name: string
  imageLink: string
  description: string
  link: string
  rewardsOwner: string
  ngoAddress: string
  totalStacked: number
  totalDonation: number
  lastDonation?: string
  donationPercent?: number
  totalUserStaked: number
  location: string
  balance: number
  stakes?: Stakes[]
}

export interface Stakes {
  balance: number
  createdAt: string
  customStakeId: number
  stackedAmount: number
  percentShare: number
  totalDonation: number
  startDate: string
}

export type ApiResponse = object

export interface RewardLookup {
  id: number
  stackedAmount: number
  balanceWithoutProfit: number
  profit: string
  donation: string
  ngoAddress: string
  /** @format date-time */
  createdAt: string
  serviceFee: string
  stake?: Stakes
}

export interface AuthTokensDto {
  accessToken: string
  refreshToken: string
}

export interface SignDto {
  publicAddress: string
}

export interface AprDto {
  Apr: number
  Timestamp: number
}

export interface AverageAprDto {
  Aprs: AprDto[]
  SmaArp: number
  Symbol: string
  Address: string
  ChainId: number
}

export interface TransactionLookup {
  id: number
  hash: string
  transactionType: string
  fromAddress: string
  toAddress: string
  ethAmount: number
  networkFee: number
  blockNumber: number
  blockTimestamp: number
}

export interface WithdrawRequestLookup {
  id: number
  graphId: string
  customRequestId: number
  ngoAddress: string
  status: 1 | 2
  stakerAddress: string
  createdAt: string
  stake: Stakes
}

export interface WithdrawStEthRequestLookup {
  id: string
  ngo: string
  claimer: string
  stake: Stakes
  blockTimestamp: number
}

export interface NgoControllerGetAllParams {
  take: number
  skip: number
}

export type NgoControllerGetAllData = ApiResponse & {
  data?: {
    items?: NGOLookup[]
    /** @default 1 */
    totalItems?: number
  }
  /** @default 200 */
  status?: number
  error?: string
}

export type NgoControllerPullNgoFromGraphData = any

export type NgoControllerDeleteNgoByIdData = any

export interface RewardControllerGetCurrentUserRewardsParams {
  take: number
  skip: number
}

export type RewardControllerGetCurrentUserRewardsData = ApiResponse & {
  data?: {
    items?: RewardLookup[]
    /** @default 1 */
    totalItems?: number
  }
  /** @default 200 */
  status?: number
  error?: string
}

export type RewardControllerPullRewardFromGraphAndScData = any

export type RewardControllerDeleteAllData = any

export type RewardControllerDeleteOneData = any

export type UserControllerGeCurrentUserDepositsInformationData = any

export type UserControllerGetCurrentUserNgoListData = ApiResponse & {
  data: NGOLookup[]
  /** @default 200 */
  status?: number
  error?: string
}

export type AuthControllerSignInData = ApiResponse & {
  data?: AuthTokensDto
  /** @default 200 */
  status?: number
  error?: string
}

export type AuthControllerSignUpData = any

export interface AuthControllerRefreshPayload {
  refreshToken?: string
}

export type AuthControllerRefreshData = ApiResponse & {
  data?: AuthTokensDto
  /** @default 200 */
  status?: number
  error?: string
}

export type AprControllerGetAverageAprData = ApiResponse & {
  data?: AverageAprDto
  /** @default 200 */
  status?: number
  error?: string
}

export interface TransactionControllerGetByWalletAddressParams {
  take: number
  skip: number
}

export type TransactionControllerGetByWalletAddressData = ApiResponse & {
  data?: {
    items?: TransactionLookup[]
    /** @default 1 */
    totalItems?: number
  }
  /** @default 200 */
  status?: number
  error?: string
}

export interface WithdrawControllerGetByWalletAddressParams {
  take: number
  skip: number
  status: 1 | 2
}

export interface withdrawControllerGetWithdrawStEth {
  take: number
  skip: number
  claimerAddress: string
}

export type WithdrawControllerGetByWalletAddressData<T = WithdrawRequestLookup> =
  ApiResponse & {
    data?: {
      items?: T[]
      /** @default 1 */
      totalItems?: number
    }
    /** @default 200 */
    status?: number
    error?: string
  }

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

import {
  TransactionLookup,
  WithdrawControllerGetByWalletAddressData,
  WithdrawControllerGetByWalletAddressParams,
  withdrawControllerGetWithdrawStEth,
} from './data-contracts'
import { HttpClient, RequestParams } from './http-client'

export class Withdraw<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http
  }

  /**
   * No description
   *
   * @tags Withdraw
   * @name WithdrawControllerGetByWalletAddress
   * @request GET:/api/withdraw/request
   * @secure
   * @response `200` `WithdrawControllerGetByWalletAddressData`
   */
  withdrawControllerGetByWalletAddress = (
    query: WithdrawControllerGetByWalletAddressParams,
    params: RequestParams = {},
  ) =>
    this.http.request<WithdrawControllerGetByWalletAddressData, any>({
      path: `/api/withdraw/request`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })

  withdrawControllerGetWithdrawStEth = (
    query: withdrawControllerGetWithdrawStEth,
    params: RequestParams = {},
  ) =>
    this.http.request<WithdrawControllerGetByWalletAddressData<TransactionLookup>, any>({
      path: `/api/withdraw/steth`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })
}

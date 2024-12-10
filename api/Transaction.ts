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
  TransactionControllerGetByWalletAddressData,
  TransactionControllerGetByWalletAddressParams,
} from './data-contracts'
import { HttpClient, RequestParams } from './http-client'

export class Transaction<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http
  }

  /**
   * No description
   *
   * @tags Transaction
   * @name TransactionControllerGetByWalletAddress
   * @request GET:/api/transaction
   * @secure
   * @response `200` `TransactionControllerGetByWalletAddressData`
   */
  transactionControllerGetByWalletAddress = (
    query: TransactionControllerGetByWalletAddressParams,
    params: RequestParams = {},
  ) =>
    this.http.request<TransactionControllerGetByWalletAddressData, any>({
      path: `/api/transaction`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })
}

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

import { AprControllerGetAverageAprData } from './data-contracts'
import { HttpClient, RequestParams } from './http-client'

export class Apr<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http
  }

  /**
   * No description
   *
   * @tags Apr
   * @name AprControllerGetAverageApr
   * @request GET:/api/apr/average
   * @response `200` `AprControllerGetAverageAprData`
   */
  aprControllerGetAverageApr = (params: RequestParams = {}) =>
    this.http.request<AprControllerGetAverageAprData, any>({
      path: `/api/apr/average`,
      method: 'GET',
      ...params,
    })
}

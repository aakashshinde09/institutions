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
  UserControllerGeCurrentUserDepositsInformationData,
  UserControllerGetCurrentUserNgoListData,
} from './data-contracts'
import { HttpClient, QueryParamsType, RequestParams } from './http-client'

export class User<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http
  }

  /**
   * No description
   *
   * @tags User
   * @name UserControllerGeCurrentUserDepositsInformation
   * @request GET:/api/user/deposits-info
   * @response `200` `UserControllerGeCurrentUserDepositsInformationData`
   */
  userControllerGeCurrentUserDepositsInformation = (params: RequestParams = {}) =>
    this.http.request<UserControllerGeCurrentUserDepositsInformationData, any>({
      path: `/api/user/deposits-info`,
      method: 'GET',
      ...params,
    })
  /**
   * No description
   *
   * @tags User
   * @name UserControllerGetCurrentUserNgoList
   * @request GET:/api/user/NGO
   * @response `200` `UserControllerGetCurrentUserNgoListData`
   */
  userControllerGetCurrentUserNgoList = (
    query: QueryParamsType = {},
    params: RequestParams = {},
  ) =>
    this.http.request<UserControllerGetCurrentUserNgoListData, any>({
      path: `/api/user/NGO`,
      method: 'GET',
      query,
      ...params,
    })

  userControllerGetUserReport = (
    query: QueryParamsType = {},
    params: RequestParams = {},
  ) =>
    this.http.request<any, any>({
      path: `/api/user/report/download`,
      method: 'GET',
      query,
      headers: {
        Accept: '*/*'
      },
      ...params,
    })
}

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
  AuthControllerRefreshData,
  AuthControllerRefreshPayload,
  AuthControllerSignInData,
  AuthControllerSignUpData,
  SignDto,
} from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Auth<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http
  }

  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerSignIn
   * @request POST:/api/auth/signIn
   * @response `200` `AuthControllerSignInData`
   */
  authControllerSignIn = (data: SignDto, params: RequestParams = {}) =>
    this.http.request<AuthControllerSignInData, any>({
      path: `/api/auth/signIn`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerSignUp
   * @request POST:/api/auth/signUp
   * @response `201` `AuthControllerSignUpData`
   */
  authControllerSignUp = (data: SignDto, params: RequestParams = {}) =>
    this.http.request<AuthControllerSignUpData, any>({
      path: `/api/auth/signUp`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerRefresh
   * @request PUT:/api/auth/refresh
   * @response `200` `AuthControllerRefreshData`
   */
  authControllerRefresh = (
    data: AuthControllerRefreshPayload,
    params: RequestParams = {},
  ) =>
    this.http.request<AuthControllerRefreshData, any>({
      path: `/api/auth/refresh`,
      method: 'PUT',
      body: data,
      type: ContentType.Json,
      ...params,
    })
}

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
  NgoControllerDeleteNgoByIdData,
  NgoControllerGetAllData,
  NgoControllerGetAllParams,
  NgoControllerPullNgoFromGraphData,
} from './data-contracts'
import { HttpClient, RequestParams } from './http-client'

export class Ngo<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http
  }

  /**
   * No description
   *
   * @tags NGO
   * @name NgoControllerGetAll
   * @request GET:/api/NGO
   * @response `200` `NgoControllerGetAllData`
   */
  ngoControllerGetAll = (query: NgoControllerGetAllParams, params: RequestParams = {}) =>
    this.http.request<NgoControllerGetAllData, any>({
      path: `/api/NGO`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags NGO
   * @name NgoControllerPullNgoFromGraph
   * @request POST:/api/NGO/pull
   * @response `200` `NgoControllerPullNgoFromGraphData`
   */
  ngoControllerPullNgoFromGraph = (params: RequestParams = {}) =>
    this.http.request<NgoControllerPullNgoFromGraphData, any>({
      path: `/api/NGO/pull`,
      method: 'POST',
      ...params,
    })
  /**
   * No description
   *
   * @tags NGO
   * @name NgoControllerDeleteNgoById
   * @request DELETE:/api/NGO/all/{id}
   * @response `200` `NgoControllerDeleteNgoByIdData`
   */
  ngoControllerDeleteNgoById = (id: number, params: RequestParams = {}) =>
    this.http.request<NgoControllerDeleteNgoByIdData, any>({
      path: `/api/NGO/all/${id}`,
      method: 'DELETE',
      ...params,
    })
}

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
  RewardControllerDeleteAllData,
  RewardControllerDeleteOneData,
  RewardControllerGetCurrentUserRewardsData,
  RewardControllerGetCurrentUserRewardsParams,
  RewardControllerPullRewardFromGraphAndScData,
} from './data-contracts'
import { HttpClient, RequestParams } from './http-client'

export class Reward<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http
  }

  /**
   * No description
   *
   * @tags Reward
   * @name RewardControllerGetCurrentUserRewards
   * @request GET:/api/reward/current
   * @response `200` `RewardControllerGetCurrentUserRewardsData`
   */
  rewardControllerGetCurrentUserRewards = (
    query: RewardControllerGetCurrentUserRewardsParams,
    params: RequestParams = {},
  ) =>
    this.http.request<RewardControllerGetCurrentUserRewardsData, any>({
      path: `/api/reward/current`,
      method: 'GET',
      query: query,
      ...params,
    })
  /**
   * No description
   *
   * @tags Reward
   * @name RewardControllerPullRewardFromGraphAndSc
   * @request POST:/api/reward/pull
   * @response `200` `RewardControllerPullRewardFromGraphAndScData`
   */
  rewardControllerPullRewardFromGraphAndSc = (params: RequestParams = {}) =>
    this.http.request<RewardControllerPullRewardFromGraphAndScData, any>({
      path: `/api/reward/pull`,
      method: 'POST',
      ...params,
    })
  /**
   * No description
   *
   * @tags Reward
   * @name RewardControllerDeleteAll
   * @request DELETE:/api/reward/all
   * @response `200` `RewardControllerDeleteAllData`
   */
  rewardControllerDeleteAll = (params: RequestParams = {}) =>
    this.http.request<RewardControllerDeleteAllData, any>({
      path: `/api/reward/all`,
      method: 'DELETE',
      ...params,
    })
  /**
   * No description
   *
   * @tags Reward
   * @name RewardControllerDeleteOne
   * @request DELETE:/api/reward/all/{id}
   * @response `200` `RewardControllerDeleteOneData`
   */
  rewardControllerDeleteOne = (id: number, params: RequestParams = {}) =>
    this.http.request<RewardControllerDeleteOneData, any>({
      path: `/api/reward/all/${id}`,
      method: 'DELETE',
      ...params,
    })
}

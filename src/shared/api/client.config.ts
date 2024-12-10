import { Apr } from "@api/Apr";
import { Auth } from "@api/Auth";
import { HttpClient } from "@api/http-client";
import { Ngo } from "@api/Ngo";
import { Reward } from "@api/Reward";
import { Transaction } from "@api/Transaction";
import { User } from "@api/User";
import { Withdraw } from "@api/Withdraw";
import { getAccessToken, getRefreshToken, setTokens } from "@shared/lib/utils";
import { Mutex } from "async-mutex";
import axios from "axios";

export const httpClient = new HttpClient();

export const ngoController = new Ngo(httpClient);
export const authController = new Auth(httpClient);
export const aprController = new Apr(httpClient);
export const rewardController = new Reward(httpClient);
export const userController = new User(httpClient);
export const transactionController = new Transaction(httpClient);
export const withdrawController = new Withdraw(httpClient);
const mutex = new Mutex();

const refreshToken = async () => {
  const release = await mutex.acquire();

  try {
    await axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/refresh`, {
        refreshToken: getRefreshToken(),
      })
      .then(({ data }) => {
        setTokens(data.data);
      })
      .catch(() => {
        throw new Error("Error while refreshing token");
      });
  } finally {
    release();
  }
};

export const initAxiosInstance = (backendUrl: string | undefined) => {
  httpClient.instance.defaults.baseURL = backendUrl;

  httpClient.instance.interceptors.request.use(async (_config) => {
    if (_config.withCredentials !== false && getAccessToken()) {
      _config.headers.Authorization = `Bearer ${getAccessToken()}`;
    }

    return _config;
  });

  httpClient.instance.interceptors.response.use(undefined, async (_error) => {
    if (_error?.response?.status === 401 && getRefreshToken()) {
      await refreshToken();
      await httpClient.instance.request(_error.config);
    }

    throw _error;
  });
};

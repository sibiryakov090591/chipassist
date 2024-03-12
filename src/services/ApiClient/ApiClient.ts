/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable no-return-assign */
import axios, { CancelTokenSource, AxiosRequestConfig, Method, AxiosPromise } from "axios";
import Cookies from "cookies-js";
import merge from "lodash/merge";
import { staticI18n } from "@src/services/I18nProvider/I18nProvider";
import { isUrl } from "@src/utils/validation";
import { schema, apiHost, apiPath } from "@src/constants/defaults";
import { getAuthToken } from "@src/utils/auth";

export interface ApiClientInterface {
  cancel_request: (cancelId: string) => void;
  get: methodFunction;
  post: methodFunction;
  put: methodFunction;
  patch: methodFunction;
  delete: methodFunction;
  cancel: methodFunction;
}

type methodFunction = (
  path: string,
  {
    params,
    data,
    config,
    cancelId,
    noapi,
  }?: {
    params?: { [key: string]: any };
    data?: { [key: string]: any };
    config?: ClientAxiosRequestConfig;
    cancelId?: string;
    noapi?: boolean;
  },
) => AxiosPromise;

type ClientAxiosRequestConfig = Omit<AxiosRequestConfig, "method"> & {
  method?: Method | "cancel";
};

function autoImplement<T>(defaults?: Partial<T>) {
  return class {
    constructor() {
      Object.assign(this, defaults || {});
    }
  } as new () => T;
}

const methods = ["get", "post", "put", "patch", "delete", "cancel"] as const;
const { i18n } = staticI18n();

export function formatUrl(path: string, noapi: boolean) {
  if (!path) {
    return "";
  }
  if (isUrl(path)) return path;
  const adjustedPath = path[0] !== "/" ? `/${path.replace(/\/?(\?|#|$)/, "/$1")}` : path.replace(/\/?(\?|#|$)/, "/$1");
  if (noapi === true) {
    return `${schema}://${apiHost + adjustedPath}`;
  }
  return `${schema}://${apiHost + apiPath + adjustedPath}`;
}

class _ApiClient extends autoImplement<ApiClientInterface>() {
  constructor() {
    super();
    const isAuthenticated = () => {
      const token = getAuthToken();
      return !!token;
    };

    const cancelTokens: { [key: string]: Omit<CancelTokenSource, "token"> } = {};
    const cancelRequest = (cancelId: string) => {
      if (cancelTokens[cancelId]) {
        cancelTokens[cancelId].cancel("request_cancelled");
        delete cancelTokens[cancelId];
      }
    };

    this.cancel_request = (cancelId: string) => {
      cancelRequest(cancelId);
    };

    methods.forEach(
      (method) =>
        (this[method] = (path, args = { params: null, data: null, config: null, cancelId: "", noapi: false }) => {
          const { params, data, config, cancelId, noapi } = args;
          const { CancelToken } = axios;

          if (cancelId) cancelRequest(cancelId);

          const axios_config = { headers: {} } as ClientAxiosRequestConfig;
          axios_config.method = method;
          axios_config.url = formatUrl(path, noapi);
          axios_config.withCredentials = true;
          axios_config.headers.accept = "application/json";
          axios_config.headers["Content-Type"] = "application/json";
          axios_config.headers["Access-Control-Allow-Origin"] = "*";
          axios_config.headers["Accept-Language"] = i18n.language;

          if (params) {
            axios_config.params(params);
          }
          if (params && params.language) {
            axios_config.headers["Accept-Language"] = params.language;
          }
          if (isAuthenticated()) {
            axios_config.headers.Authorization = `Token ${getAuthToken()}`;
          }
          if (Cookies.get("csrftoken")) {
            axios_config.headers["X-CSRFToken"] = Cookies.get("csrftoken");
          }
          if (data) {
            axios_config.data = data;
          }

          axios_config.cancelToken = new CancelToken(function executor(c) {
            if (cancelId) cancelTokens[cancelId] = { cancel: c };
          });

          return axios(merge(axios_config, config) as AxiosRequestConfig);

          // Informational responses (100–199),
          // Successful responses (200–299),
          // Redirects (300–399),
          // Client errors (400–499),
          // and Server errors (500–599).

          // .catch((error) => {
          //   if (error.response) {
          //     // The request was made and the server responded with a status code
          //   } else if (error.request) {
          //     // The request was made but no response was received
          //   } else {
          //     // Something happened in setting up the request that triggered an Error
          //   }
          //   // console.log(error.config);
          // });
        }),
    );
  }
}

const ApiClient = _ApiClient;
export default ApiClient;

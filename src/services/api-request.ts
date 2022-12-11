import Axios, {
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  CancelTokenSource,
  CancelTokenStatic,
  Method,
  AxiosBasicCredentials
} from 'axios';

import { APIDetailType, RequestBodyType } from '@/store/apiDetails';
import TokenService from './token-storage';
import userManagement from '@/store/apiDetails/user-management';

export interface RequestParam {
  [key: string]: Primitive | undefined;
}

interface TransformedRequestData {
  auth?: AxiosBasicCredentials;
  data: unknown;
}

const basicAuth: AxiosBasicCredentials = {
  username: 'clientid',
  password: 'secret'
};

let isAlreadyFetchingAccessToken = false;
let apiSubscribers: ((token: string) => Promise<any>)[] = [];

function onAccessTokenFetched(access_token: any) {
  apiSubscribers = apiSubscribers.filter((callback) => callback(access_token));
}

function addSubscriber(callback: (token: string) => Promise<any>) {
  apiSubscribers.push(callback);
}

const getGrantType = { key: 'grant_type', value: 'password' };
const getRequestHeaders = (
  apiDetails: APIDetailType,
  initialAuthToken: string | undefined,
  extraData?: { [key: string]: Primitive }
) => {
  const bearerToken = extraData?.temporaryToken || TokenService.getAccessToken();
  console.log(initialAuthToken, 'cjdslkajflkas');

  let headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    Authorization: !initialAuthToken ? 'Bearer ' + bearerToken : 'Bearer ' + initialAuthToken
  };

  console.log(headers, 'headers');

  switch (apiDetails.requestBodyType) {
    case 'QUERY-STRING':
      headers = {
        ...headers,
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      break;
    case 'FORM-DATA':
      headers = {
        ...headers,
        'Content-Type': 'multipart/form-data'
      };
      break;
    case 'NO-AUTH':
      delete headers['Authorization'];
      break;
    default:
      headers = { ...headers };
  }
  return headers;
};
function getFormData(requestData: { [key: string]: RequestDataType }) {
  const formData = new FormData();
  for (const data in requestData) {
    if (requestData[data] instanceof Array) {
      requestData[data].forEach((dataEl: RequestDataType, index: number) => {
        if (dataEl instanceof Object && !(dataEl instanceof File)) {
          Object.keys(dataEl).forEach((elKey) =>
            formData.append(`${data}[${index}].${elKey}`, dataEl[elKey])
          );
        } else if (dataEl instanceof File) {
          // formData.append(data, dataEl);
          formData.append(`${data}[${index}]`, dataEl);
        } else if (typeof dataEl === 'number' || typeof dataEl === 'string') {
          formData.append(`${data}[${index}]`, dataEl.toString());
        }
      });
    } else if (requestData[data] instanceof Object && !(requestData[data] instanceof File)) {
      Object.entries(requestData[data]).forEach(([key, value]: [string, RequestDataType]) =>
        formData.append(`${data}.${key}`, value)
      );
    } else {
      formData.append(data, requestData[data]);
    }
  }
  return formData;
}

function getQueryString(data: { [key: string]: string }) {
  return new URLSearchParams(data);
}

const manageErrorResponse = (error: any, apiDetails: APIDetailType) => {
  const errorResponse: any = {
    message: 'Error',
    data: null,
    status: false
    // status: error.code || 400,
    // noconnection: false,
    // config: error.config,
    // isAxiosError: error.isAxiosError,
  };

  errorResponse.message = error.message; // Something happened in setting up the request that triggered an Error

  error.logout && (errorResponse.logout = error.logout);
  if (error.logout) {
    isAlreadyFetchingAccessToken = false;
  }
  if (error.response) {
    errorResponse.response = error.response; // The server responded with a status code and data

    if (apiDetails.queryKeyName !== 'AUTHFILE') {
      errorResponse.data = error.response.data; // The server responded with a status code and data
    }
  } else if (error.request) {
    errorResponse.message = 'Server could not be reached.'; // No response was received
    errorResponse.noConnection = true;
  }

  errorResponse.config = error.config; // Request Params Configs
  errorResponse.isAxiosError = error.isAxiosError; //If Axios Error
  console.log(errorResponse, 'rejlajfldajslfjlasdf');
  return errorResponse;
};

const requestRefreshToken = (error: AxiosError, apiDetails: APIDetailType) => {
  //work here
  const originalRequest: any = error.config;
  let retryOriginalRequest: any;

  const initAddToQueue = () => {
    if (isAlreadyFetchingAccessToken) {
      retryOriginalRequest = new Promise((resolve) => {
        addSubscriber(async () => {
          originalRequest.headers['Authorization'] = 'Bearer ' + TokenService.getAccessToken();
          const originalRequestResponse = await Axios(originalRequest);

          return resolve(originalRequestResponse);
        });
      });
    }
  };

  const responseError: any = error.response;

  console.log(responseError, 'fjdkafjlkdjslad');

  if (responseError?.status === 401 && responseError.data?.data?.code === 'token_not_valid') {
    const url: string = process.env.REACT_APP_API_ENDPOINT as string;

    const localRkData = TokenService.getRefreshToken();

    const requestUrl = url + userManagement.authentication.refreshToken.controllerName;
    console.log(localRkData, 'localrkdata');

    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      // const requestBody = new FormData()
      // requestBody.append('refreshToken', localRkData)

      return Axios.request({
        url: requestUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localRkData
        },
        data: {
          refresh: localRkData
        }
      })
        .then((res) => {
          TokenService.setToken(res.data?.data?.access);

          initAddToQueue();

          isAlreadyFetchingAccessToken = false;
          onAccessTokenFetched(res.data.accessToken);
          return retryOriginalRequest;
          //generate previous request again taking new token
        })
        .catch((err) => {
          return manageErrorResponse({ ...err, logout: true }, apiDetails);
        });
    }
    initAddToQueue();
    return retryOriginalRequest;
  }

  return Promise.reject(error);
};

const transformRequestData = (apiDetails: APIDetailType, requestData: RequestDataType) => {
  const transformedRequestData: TransformedRequestData = { data: requestData };

  switch (apiDetails.requestBodyType) {
    case 'NO-AUTH':
      transformedRequestData.auth = basicAuth;
      transformedRequestData.data = getFormData(requestData);
      if (transformedRequestData.data instanceof FormData)
        transformedRequestData.data.append(getGrantType.key, getGrantType.value);
      break;
    case 'FORM-DATA':
      transformedRequestData.data = getFormData(requestData);
      break;
    case 'QUERY-STRING':
      transformedRequestData.data = getQueryString(requestData);
      break;
    default:
      transformedRequestData.data = requestData;
      break;
  }

  return transformedRequestData;
};

// Cancel a request using a cancel token.
const cancelToken: CancelTokenStatic = Axios.CancelToken;
const source: CancelTokenSource = cancelToken.source();

export default function initApiRequest<TData>(
  apiDetails: APIDetailType,
  requestData: RequestDataType,
  requestMethod: Method,
  params?: RequestParam,
  cancelSource?: CancelTokenSource,
  initialAuthToken?: string | undefined,
  extraData?: { [key: string]: Primitive }
): Promise<AxiosResponse<TData>> {
  // API URL
  const url = extraData?.changeEndpoint
    ? process.env.REACT_APP_API_MEDIA_ENDPOINT
    : process.env.REACT_APP_API_ENDPOINT;

  const headers = getRequestHeaders(apiDetails, initialAuthToken, extraData);
  const transformedRequestData = transformRequestData(apiDetails, requestData);

  let axiosReqParams: AxiosRequestConfig = {
    // baseURL: apiDetails.controllerName,
    baseURL: url,
    url: apiDetails.controllerName,
    method: requestMethod,
    responseType: 'json',
    timeout: 60 * 3 * 1000,
    cancelToken: cancelSource ? cancelSource.token : source.token,
    headers: headers,
    ...transformedRequestData
  };

  if (params) {
    axiosReqParams = {
      ...axiosReqParams,
      params: params
    };
  }

  if (apiDetails.requestBodyType === RequestBodyType.FILE) {
    axiosReqParams.responseType = 'blob';
  }

  Axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        error.response?.data?.data?.code === 'token_not_valid' &&
        error.response?.config?.url !==
          url + userManagement.authentication.refreshToken.controllerName
      ) {
        return requestRefreshToken(error, apiDetails);
      }
      return Promise.reject(error);
    }
  );

  return Axios.request(axiosReqParams)
    .then((response: AxiosResponse) => response)
    .catch((error: AxiosError) => {
      const errorResponse = manageErrorResponse(error, apiDetails);
      throw errorResponse;
    });
}

// Axios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error: AxiosError) {
//     return error
//   }
// );

import Axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource, Method } from 'axios';

import { FailToast, SuccessToast } from '@/components/ToastNotifier/ToastNotifier';
import initApiRequest, { RequestParam } from '@/services/api-request';
import { APIDetailType } from '@/store/apiDetails';
import { STATUS_ENUM } from '@/shared/enums';
import TokenService from '@/services/token-storage';
import { requestTimeout } from '@/utils/timeout';

/**
 * Request details for XMLHTTP request
 */

export const modulePrefix = {
  masterData: 'master_data'
};

export interface ResponseError {
  message: string;
  data: any;
  status: boolean;
  response?: AxiosResponse;
  config?: AxiosRequestConfig;
  noconnection?: boolean;
  isAxiosError?: boolean;
  logout?: boolean;
}

export interface BasicResponse {
  description: string;
  servedBy: string;
  status: number;
  success: boolean;
}
export interface StatusType {
  id: STATUS_ENUM;
  status: string;
  status_np: string;
}

function sanitizeController(
  apiDetail: APIDetailType,
  pathVariables?: { [key: string]: Primitive }
) {
  return pathVariables && Object.keys(pathVariables).length
    ? {
        ...apiDetail,
        controllerName: Object.entries(pathVariables).reduce(
          (acc, [key, value]) => (acc = acc.replace(`{${key}}`, value?.toString())),
          apiDetail.controllerName
        )
      }
    : apiDetail;
}
export interface APIRequestDetail {
  /**Request data for the API */
  requestData?: RequestDataType;
  /** REST API Method
   *
   * This will override requestMethod provided by apiDetails
   */
  requestMethod?: Method;
  /**Path variables present in controller
   *
   * Provided pathVariables -> {id: 1, type: 'test'}
   * Converts controller-url/{id}/{type} -> controller-url/1/test
   */
  pathVariables?: { [key: string]: Primitive };
  /**Request params
   *
   * Provided params -> {id: 1, type: 'test'}
   * Converts controller-url -> controller-url?id=1&type=test
   */
  params?: RequestParam;
  /**Axios cancel token source */
  cancelSource?: CancelTokenSource;
  /**Disable Success Toast */
  disableSuccessToast?: boolean;
  /**Disable Failure Toast */
  disableFailureToast?: boolean;
  enableSuccessToast?: boolean;
  initialAuthToken?: string;
}
let sessionExpiredLanguageCount = 0;
export interface CustomResponse<TData = unknown> extends AxiosResponse {
  message: string;
  data: TData | null;
  // data: TData | undefined;
  status: number;
  noconnection: boolean;
  config: AxiosRequestConfig;
  isAxiosError: boolean;
}

export interface CommonArrayResponseTypes<T> {
  description?: string;
  servedBy?: string;
  status?: number;
  success?: boolean;
  data: {
    hasNext?: boolean;
    records: T;
    totalPages: number;
    totalRecords: number;
  };
}

export interface ArrayResponseTypes<T> {
  description?: string;
  servedBy?: string;
  status?: number;
  success?: boolean;
  data: {
    next?: null | number;
    records: T;
    previous?: null | number;
    count?: number;
  };
}

export interface PaginatedParams {
  page_size?: number | string;
  page?: number | string;
  escape_pg?: boolean;
}

export type APIResponseDetail<TData = unknown> = Promise<CustomResponse<TData>>;

let timeoutLanguageCount = 0;
let noServerConnectionLanguageCount = 0;
let noConnectionLanguageCount = 0;
const axiosCancelSource = Axios.CancelToken.source();

/**
 * Manages API call and updates reducer with success or failure
 * @param apiDetails redux action and api config
 * @param apiRequestDetails request details for XMLHTTP request
 */
export default async function performApiAction<TData = unknown>(
  apiDetails: APIDetailType,
  apiRequestDetails: APIRequestDetail = {}
): Promise<CustomResponse<TData>> {
  const {
    requestData,
    requestMethod,
    pathVariables,
    params,
    cancelSource,
    disableSuccessToast = false,
    disableFailureToast,
    enableSuccessToast = false,
    initialAuthToken
  } = apiRequestDetails;

  console.log(disableFailureToast);

  // Check for path variables in controllername
  const sanitizedApiDetails = sanitizeController(apiDetails, pathVariables);

  let responseData: any;
  try {
    responseData = await initApiRequest<TData>(
      sanitizedApiDetails,
      requestData,
      requestMethod || sanitizedApiDetails.requestMethod || 'GET',
      params,
      cancelSource || axiosCancelSource,
      initialAuthToken
    );
    if (
      (responseData as unknown as ResponseError).isAxiosError &&
      (responseData as unknown as ResponseError).response?.status === 401
    ) {
      if (TokenService.getAccessToken()) {
        TokenService.clearToken();
        if (!sessionExpiredLanguageCount) {
          FailToast('Session Expired, Please Re-Login');
          sessionExpiredLanguageCount++;
          window.location.reload();

          requestTimeout(() => {
            sessionExpiredLanguageCount--;
          }, 500);
        }
      }
    }

    if (!responseData) {
      throw responseData;
    }
    if (enableSuccessToast) {
      SuccessToast(responseData.data?.message);
    }

    if (disableSuccessToast) {
      // No work done
    } else {
      if (![requestMethod, sanitizedApiDetails.requestMethod].includes('GET')) {
        // SuccessToast(responseData.data?.message);
      }
    }
  } catch (customThrownError) {
    responseData = customThrownError;
    let errorResponseData: { [key: string]: RequestDataType } = {};

    if (responseData instanceof Object) {
      errorResponseData = { ...responseData };
    }

    if (errorResponseData.status === 413) {
      FailToast('कृपया १२ MB भन्दा कम साइजको फाइलहरु अपलोड गर्नुहोला ।');
    }

    // if (disableFailureToast) {
    //   // No work done
    // } else {
    //   errorResponseData?.data?.message && FailToast(errorResponseData?.data?.message + 'hello');
    // }

    // Axios Timeout
    if (errorResponseData.config?.code === 'ECONNABORTED') {
      if (!timeoutLanguageCount) {
        timeoutLanguageCount++;
        // FailToast(requestTimeoutLanguage());
      }
    }
    if ((responseData as ResponseError).data && (responseData as ResponseError).isAxiosError) {
      if (responseData.data?.message) {
        FailToast(responseData.data?.message);
      } else if (errorResponseData?.message) {
        FailToast(
          'Server is taking too long to respond, this can be caused by either poor connectivity or an error with our servers. Please try again in a while!'
        );
      }
    }

    // No Connection
    if (errorResponseData.noconnection) {
      // No Server Connection
      if (errorResponseData.message === 'Server could not be reached') {
        if (!noServerConnectionLanguageCount) {
          noServerConnectionLanguageCount++;
          // FailToast(noConnectionLanguage());
        }
      }
      // No Connection
      else if (errorResponseData.config.code !== 'ECONNABORTED') {
        if (!noConnectionLanguageCount) {
          noConnectionLanguageCount++;
          // FailToast(noConnectionLanguage());
        }
      }
    }

    throw new Error(errorResponseData?.message);
  }

  return responseData as CustomResponse<TData>;
}

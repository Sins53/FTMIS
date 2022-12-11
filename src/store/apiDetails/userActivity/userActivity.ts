import { RequestBodyType, RequestMethod } from '../request';
const prefix = 'log_management/';

const userActivity = {
  getAllInternalUserActivityList: {
    controllerName: prefix + 'internal_user_activity_log',
    queryKeyName: 'GET_ALL_INTERNAL_USER_ACTIVITY_LIST',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getLoginLogoutLog: {
    controllerName: prefix + 'login_logout_timing',
    queryKeyName: 'GET_LOGIN_LOGOUT_LOG',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getOTPDetailsLog: {
    controllerName: prefix + 'otp_entered_detail',
    queryKeyName: 'GET_ALL_OTP_DETAILS_LOG',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default userActivity;

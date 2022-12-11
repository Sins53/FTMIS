import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/gov-prov-reporting-online-portal';

const reportOnlinePortal = {
  createReportOnlinePortalData: {
    controllerName: prefix,
    queryKeyName: 'CREATE_REPORT_ONLINE_PORTAL_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getReportOnlinePortalDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_REPORT_ONLINE_PORTAL_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default reportOnlinePortal;

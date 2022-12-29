import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant/gov-to-localbody-reporting-online-portal';

const reportOnlinePortal = {
  getFedToLocalReportOnlinePortalDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FED_TO_LOCAL_REPORT_ONLINE_PORTAL_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalReportOnlinePortalData: {
    controllerName: prefix,
    queryKeyName: 'IMPORT_BULK_CSV_FED_TO_LOCAL_REPORT_ONLINE_PORTAL',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalReportOnlinePortalListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_FED_TO_LOCAL_REPORT_ONLINE_PORTAL_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  updateFedToLocalReportOnlinePortalData: {
    controllerName: prefix + 'changeThis/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_REPORT_ONLINE_PORTAL_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default reportOnlinePortal;

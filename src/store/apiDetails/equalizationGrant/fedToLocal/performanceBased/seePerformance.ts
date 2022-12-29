import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant/gov-to-localbody-see-performance';

const seePerformance = {
  getFedToLocalSeePerformanceDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FED_TO_LOCAL_SEE_PERFORMANCE_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalSeePerformanceData: {
    controllerName: prefix,
    queryKeyName: 'IMPORT_BULK_CSV_FED_TO_LOCAL_SEE_PERFORMANCE',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalSeePerformanceListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_FED_TO_LOCAL_SEE_PERFORMANCE_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  updateFedToLocalSeePerformanceData: {
    controllerName: prefix + 'changeThis/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_SEE_PERFORMANCE_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default seePerformance;

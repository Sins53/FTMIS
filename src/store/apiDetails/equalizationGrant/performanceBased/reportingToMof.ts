import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/gov-prov-reporting-mof-budget';

const reportingToMof = {
  createReportingToMofData: {
    controllerName: prefix,
    queryKeyName: 'CREATE_REPORTING_TO_MOF_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getReportingToMofDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_REPORTING_TO_MOF_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default reportingToMof;

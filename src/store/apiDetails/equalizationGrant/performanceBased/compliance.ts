import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/complience-indicator';

const compliance = {
  createComplianceData: {
    controllerName: prefix + '-create',
    queryKeyName: 'CREATE_COMPLIANCE_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getComplianceDetails: {
    controllerName: prefix + '-list',
    queryKeyName: 'GET_COMPLIANCE_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default compliance;

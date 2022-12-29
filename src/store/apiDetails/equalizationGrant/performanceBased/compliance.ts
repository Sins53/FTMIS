import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/gov-prov-compliance-indicator';

const compliance = {
  createComplianceData: {
    controllerName: prefix,
    queryKeyName: 'CREATE_COMPLIANCE_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getComplianceDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_COMPLIANCE_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default compliance;

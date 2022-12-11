import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/gov-prov-electricity-access';

const electricityAccess = {
  createElectricityAccessData: {
    controllerName: prefix,
    queryKeyName: 'CREATE_ELECTRICITY_ACCESS_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getElectricityAccessDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_ELECTRICITY_ACCESS_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default electricityAccess;

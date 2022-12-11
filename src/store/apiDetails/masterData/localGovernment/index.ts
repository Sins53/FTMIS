import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'master_data';

const localGovernment = {
  getAllLocalGovernmentData: {
    controllerName: prefix + '/local-bodies',
    queryKeyName: 'GET_ALL_LOCAL_GOVERNMENT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default localGovernment;

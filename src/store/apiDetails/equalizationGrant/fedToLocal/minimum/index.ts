import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant';

const minimumGrant = {
  getFedToLocalMinimalGrant: {
    controllerName: prefix + '/gov-localbody-minimum-grant-detail',
    queryKeyName: 'GET_FED_LOCAL_MINIMUM_GRANT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalMinimalGrant: {
    controllerName: prefix + '/gov-localbody-minimum-grant-detail',
    queryKeyName: 'CREATE_FED_LOCAL_MINIMAL_GRANT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalMinimalGrantPercent: {
    controllerName: prefix + '/gov-localbody-minimum-grant',
    queryKeyName: 'GET_FED_LOCAL_MINIMUM_GRANT_PERCENT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
  // updateFedToLocalMinimalGrant: {
  //   controllerName: prefix + '/gov-localbody-minimum-grant-detail/{id}',
  //   queryKeyName: 'UPDATE_FED_LOCAL_MINIMAL_GRANT',
  //   requestBodyType: RequestBodyType.AUTH,
  //   requestMethod: RequestMethod.PUT
  // }
  //   getFedToLocalMinimalGrantData: {
  //     controllerName: prefix + '/province-minimum-grant-amount-list',
  //     queryKeyName: 'GET_FED_LOCAL_MINIMUM_GRANT_DATA',
  //     requestBodyType: RequestBodyType.AUTH,
  //     requestMethod: RequestMethod.GET
  //   },
  //   calculateFedToLocalMinimalGrantData: {
  //     controllerName: prefix + '/province-minimum-grant',
  //     queryKeyName: 'CALCULATE_FED_LOCAL_MINIMUM_GRANT_DATA',
  //     requestBodyType: RequestBodyType.AUTH,
  //     requestMethod: RequestMethod.GET
  //   }
};

export default { ...minimumGrant };

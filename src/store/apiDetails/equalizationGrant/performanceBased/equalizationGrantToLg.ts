import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/gov-prov-equalization-grant-to-lg';

const equalizationGrantToLg = {
  createEqualizationGrantToLgData: {
    controllerName: prefix,
    queryKeyName: 'CREATE_EQUALIZATION_GRANT_TO_LG_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getEqualizationGrantToLgDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_EQUALIZATION_GRANT_TO_LG_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default equalizationGrantToLg;

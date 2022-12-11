import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/gov-prov-fiscal-gap';

const fiscalGap = {
  createFiscalGapData: {
    controllerName: prefix,
    queryKeyName: 'CREATE_FISCAL_GAP_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getFiscalGapDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FISCAL_GAP_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default fiscalGap;

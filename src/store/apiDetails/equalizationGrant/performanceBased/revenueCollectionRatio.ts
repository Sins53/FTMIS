import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/gov-prov-revenue-collection-ratio';

const revenueCollectionRatio = {
  createRevenueCollectionRatioData: {
    controllerName: prefix,
    queryKeyName: 'CREATE_REVENUE_COLLECTION_RATIO_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getRevenueCollectionRatioDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_REVENUE_COLLECTION_RATIO_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default revenueCollectionRatio;

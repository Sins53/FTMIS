import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/gov-prov-revenue-collection-progress';

const revenueCollectionProgress = {
  createRevenueCollectionProgressData: {
    controllerName: prefix,
    queryKeyName: 'CREATE_REVENUE_COLLECTION_PROGRESS_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getRevenueCollectionProgressDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_REVENUE_COLLECTION_PROGRESS_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default revenueCollectionProgress;

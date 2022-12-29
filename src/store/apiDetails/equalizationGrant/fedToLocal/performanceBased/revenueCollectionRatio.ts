import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant/gov-to-localbody-revenue-collection-ratio';

const revenueCollectionRatio = {
  getFedToLocalRevenueCollectionRatioDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FED_TO_LOCAL_REVENUE_COLLECTION_RATIO_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalRevenueCollectionRatioData: {
    controllerName: prefix,
    queryKeyName: 'IMPORT_BULK_CSV_REVENUE_COLLECTION_RATIO',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalRevenueCollectionRatioListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_FED_TO_LOCAL_GOVERNMENT_REVENUE_RATIO_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  updateFedToLocalRevenueCollectionRatioData: {
    controllerName: prefix + 'changeThis/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_REVENUE_COLLECTION_RATIO_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default revenueCollectionRatio;

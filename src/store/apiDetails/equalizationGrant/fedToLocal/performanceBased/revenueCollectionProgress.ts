import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant/gov-to-localbody-revenue-collection-progress';

const revenueCollectionProgress = {
  getFedToLocalRevenueCollectionProgressDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FED_TO_LOCAL_REVENUE_COLLECTION_PROGRESS_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalRevenueCollectionProgressData: {
    controllerName: prefix,
    queryKeyName: 'IMPORT_BULK_CSV_REVENUE_COLLECTION_PROGRESS',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalRevenueCollectionProgressListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_FED_TO_LOCAL_GOVERNMENT_REVENUE_PROGRESS_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  updateFedToLocalRevenueCollectionProgressData: {
    controllerName: prefix + 'changeThis/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_REVENUE_COLLECTION_PROGRESS_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default revenueCollectionProgress;

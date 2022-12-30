import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant/gov-to-localbody-distribution-of-tax';

const taxDistribution = {
  getFedToLocalTaxDistributionDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FED_TO_LOCAL_TAX_DISTRIBUTION_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalTaxDistributionData: {
    controllerName: prefix,
    queryKeyName: 'IMPORT_BULK_CSV_FED_TO_LOCAL_TAX_DISTRIBUTION',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalTaxDistributionListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_FED_TO_LOCAL_TAX_DISTRIBUTION_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  updateFedToLocalTaxDistributionData: {
    controllerName: prefix + 'changeThis/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_TAX_DISTRIBUTION_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default taxDistribution;

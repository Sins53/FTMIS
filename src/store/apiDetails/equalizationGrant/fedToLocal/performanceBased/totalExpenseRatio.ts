import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant/gov-to-localbody-total-expense-ratio';

const totalExpenseRatio = {
  getFedToLocalTotalExpenseRatioDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FED_TO_LOCAL_TOTAL_EXPENSE_RATIO_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalTotalExpenseRatioData: {
    controllerName: prefix,
    queryKeyName: 'IMPORT_BULK_CSV_FED_TO_LOCAL_TOTAL_EXPENSE_RATIO',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalTotalExpenseRatioListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_FED_TO_LOCAL_TOTAL_EXPENSE_RATIO_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  updateFedToLocalTotalExpenseRatioData: {
    controllerName: prefix + 'changeThis/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_TOTAL_EXPENSE_RATIO_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default totalExpenseRatio;

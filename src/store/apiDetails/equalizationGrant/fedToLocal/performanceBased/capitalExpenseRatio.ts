import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant/gov-to-localbody-capital-expense-ratio';

const capitalExpenseRatio = {
  getFedToLocalCapitalExpenseRatioDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FED_TO_LOCAL_CAPITAL_EXPENSE_RATIO_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalCapitalExpenseRatioData: {
    controllerName: prefix,
    queryKeyName: 'IMPORT_BULK_CSV_FED_TO_LOCAL_CAPITAL_EXPENSE_RATIO',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalCapitalExpenseRatioListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_FED_TO_LOCAL_CAPITAL_EXPENSE_RATIO_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  updateFedToLocalCapitalExpenseRatioData: {
    controllerName: prefix + 'changeThis/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_CAPITAL_EXPENSE_RATIO_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default capitalExpenseRatio;

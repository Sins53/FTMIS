import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/gov-prov-total-expense-ratio';

const totalExpenseRatio = {
  createTotalExpenseRatioData: {
    controllerName: prefix,
    queryKeyName: 'CREATE_TOTAL_EXPENSE_RATIO_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getTotalExpenseRatioDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_TOTAL_EXPENSE_RATIO_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default totalExpenseRatio;

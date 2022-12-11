import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/gov-prov-capital-expense-ratio';

const capitalExpenseRatio = {
  createCapitalExpenseRatioData: {
    controllerName: prefix,
    queryKeyName: 'CREATE_CAPITAL_EXPENSE_RATIO_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getCapitalExpenseRatioDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_CAPITAL_EXPENSE_RATIO_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default capitalExpenseRatio;

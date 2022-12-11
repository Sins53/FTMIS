import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/gov-prov-revenue-condition';

const revenueCondition = {
  calculateRevenueConditionData: {
    controllerName: prefix,
    queryKeyName: 'CALCULATE_REVENUE_CONDITION_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getRevenueConditionDetails: {
    controllerName: prefix + '-list',
    queryKeyName: 'GET_REVENUE_CONDITION_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default revenueCondition;

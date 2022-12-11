import { RequestBodyType, RequestMethod } from '../request';

const prefix = 'loan_management';
export const popularLoan = prefix + '/popular-loans';

const prefixUser = 'users/dashboard';

export const dashboard = {
  popularLoan: {
    controllerName: popularLoan,
    queryKeyName: 'POPULAR_LOAN',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  internalDashboardCounts: {
    controllerName: prefixUser + '/info',
    queryKeyName: 'INTERNAL_DASHBOARD_COUNTS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  internalDashboardGraphs: {
    controllerName: prefixUser + '/status-wise',
    queryKeyName: 'INTERNAL_DASHBOARD_GRAPH',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};
export default dashboard;

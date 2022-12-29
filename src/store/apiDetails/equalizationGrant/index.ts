import { RequestBodyType, RequestMethod } from '../request';
import performanceBased from './performanceBased';
import formulaBased from './formulaBased';
import fedToLocal from './fedToLocal';

const prefix = 'equalization_grant';

const equalizationGrant = {
  getBudgetStatus: {
    controllerName: prefix + '/budget-status',
    queryKeyName: 'GET_BUDGET',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createBudgetStatus: {
    controllerName: prefix + '/budget',
    queryKeyName: 'CREATE_BUDGET',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  editBudget: {
    controllerName: prefix + '/budget/{id}',
    queryKeyName: 'UPDATE_BUDGET',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  getBudgetById: {
    controllerName: prefix + '/budget/{id}',
    queryKeyName: 'GET_BUDGET_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },

  getMinimalGrant: {
    controllerName: prefix + '/minimum-grant',
    queryKeyName: 'GET_MINIMUM_GRANT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createMinimalGrant: {
    controllerName: prefix + '/minimum-grant',
    queryKeyName: 'CREATE_MINIMAL_GRANT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  updateMinimalGrant: {
    controllerName: prefix + '/minimum-grant/{id}',
    queryKeyName: 'UPDATE_MINIMAL_GRANT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  getProvinceMinimalGrantData: {
    controllerName: prefix + '/province-minimum-grant-amount-list',
    queryKeyName: 'GET_PROVINCE_MINIMUM_GRANT_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  calculateProvinceMinimalGrantData: {
    controllerName: prefix + '/province-minimum-grant',
    queryKeyName: 'CALCULATE_PROVINCE_MINIMUM_GRANT_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },

  getIndicatorList: {
    controllerName: prefix + '/indicator',
    queryKeyName: 'GET_INDICATOR',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getFinalResult: {
    controllerName: prefix + '/gov-to-prov-final-result',
    queryKeyName: 'GET_EQUALIZATION_GRANT_FINAL_RESULT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default { ...equalizationGrant, performanceBased, formulaBased, fedToLocal };

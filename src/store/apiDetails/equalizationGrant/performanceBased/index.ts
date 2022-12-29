import { RequestBodyType, RequestMethod } from '../../request';
import beruju from './beruju';
import compliance from './compliance';
import vehicleTax from './vehicleTax';
import totalExpenseRatio from './totalExpenseRatio';
import capitalExpenseRatio from './capitalExpenseRatio';
import revenueCollectionRatio from './revenueCollectionRatio';
import revenueCollectionProgress from './revenueCollectionProgress';
import airQualityIndex from './airQualityIndex';
import reportOnlinePortal from './reportOnlinePortal';
import equalizationGrantToLg from './equalizationGrantToLg';
import reportingToMof from './reportingToMof';
import budgetReview from './budgetReview';
import increaseForestArea from './increaseForestArea';

const prefix = 'equalization_grant';

const performanceBased = {
  getPerformanceBasedGrant: {
    controllerName: prefix + '/performance-based-detail',
    queryKeyName: 'GET_PERFORMANCE_BASED_GRANT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createPerformanceBasedGrant: {
    controllerName: prefix + '/performance-based-grant',
    queryKeyName: 'CREATE_PERFORMANCE_BASED_GRANT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  updatePerformanceBasedGrant: {
    controllerName: prefix + '/performance-based-grant/{id}',
    queryKeyName: 'UPDATE_PERFORMANCE_BASED_GRANT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  getPerformanceGrantFinalResult: {
    controllerName: prefix + '/performance-grant-total-distribution',
    queryKeyName: 'GET_PERFORMANCE_GRANT_FINAL_RESULT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default {
  ...performanceBased,
  beruju,
  compliance,
  vehicleTax,
  totalExpenseRatio,
  capitalExpenseRatio,
  revenueCollectionRatio,
  revenueCollectionProgress,
  airQualityIndex,
  reportOnlinePortal,
  equalizationGrantToLg,
  reportingToMof,
  budgetReview,
  increaseForestArea
};

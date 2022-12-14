import { RequestBodyType, RequestMethod } from '../../../request';
import revenueCollectionProgress from './revenueCollectionProgress';
import revenueCollectionRatio from './revenueCollectionRatio';
import totalExpenseRatio from './totalExpenseRatio';
import capitalExpenseRatio from './capitalExpenseRatio';
import beruju from './beruju';
import sutraPortal from './sutraPortal';
import periodicPlan from './periodicPlan';
import netAdmissionRate from './netAdmissionRate';
import studentConsistencyRate from './studentConsistencyRate';
import seePerformance from './seePerformance';
import pregnancyTest from './pregnancyTest';
import reportOnlinePortal from './reportOnlinePortal';
import healthInstitute from './healthInstitute';
import completeVaccination from './completeVaccination';
import budgetPresentation from './budgetPresentation';
import budgetApproval from './budgetApproval';
import taxDistribution from './taxDistribution';
import reportingToMof from './reportingToMof';

const prefix = 'equalization_grant';

const performanceBased = {
  getFedToLocalPerformanceBasedGrant: {
    controllerName: prefix + '/gov-localbody-performance-based-grant',
    queryKeyName: 'GET_FED_TO_LOCAL_PERFORMANCE_BASED_GRANT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalPerformanceBasedGrant: {
    controllerName: prefix + '/gov-localbody-performance-based-grant',
    queryKeyName: 'CREATE_FED_TO_LOCAL_PERFORMANCE_BASED_GRANT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  updateFedToLocalPerformanceBasedGrant: {
    controllerName: prefix + '/gov-localbody-performance-based-grant/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_PERFORMANCE_BASED_GRANT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
  //   getPerformanceGrantFinalResult: {
  //     controllerName: prefix + '/performance-grant-total-distribution',
  //     queryKeyName: 'GET_PERFORMANCE_GRANT_FINAL_RESULT',
  //     requestBodyType: RequestBodyType.AUTH,
  //     requestMethod: RequestMethod.GET
  //   }
};

export default {
  ...performanceBased,
  revenueCollectionProgress,
  revenueCollectionRatio,
  totalExpenseRatio,
  capitalExpenseRatio,
  beruju,
  sutraPortal,
  periodicPlan,
  netAdmissionRate,
  studentConsistencyRate,
  seePerformance,
  pregnancyTest,
  reportOnlinePortal,
  healthInstitute,
  completeVaccination,
  budgetPresentation,
  budgetApproval,
  taxDistribution,
  reportingToMof
};

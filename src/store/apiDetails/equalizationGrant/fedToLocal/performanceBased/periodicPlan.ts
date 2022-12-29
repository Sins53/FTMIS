import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant/gov-to-localbody-formulation-of-periodic-plan';

const periodicPlan = {
  getFedToLocalPeriodicPlanDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FED_TO_LOCAL_PERIODIC_PLAN_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalPeriodicPlanData: {
    controllerName: prefix,
    queryKeyName: 'IMPORT_BULK_CSV_FED_TO_LOCAL_PERIODIC_PLAN',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalPeriodicPlanListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_FED_TO_LOCAL_PERIODIC_PLAN_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  updateFedToLocalPeriodicPlanData: {
    controllerName: prefix + 'changeThis/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_PERIODIC_PLAN_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default periodicPlan;

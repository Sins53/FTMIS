import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant/gov-to-localbody-presentation-of-budget';

const budgetPresentation = {
  getFedToLocalBudgetPresentationDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FED_TO_LOCAL_BUDGET_PRESENTATION_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalBudgetPresentationData: {
    controllerName: prefix,
    queryKeyName: 'IMPORT_BULK_CSV_FED_TO_LOCAL_BUDGET_PRESENTATION',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalBudgetPresentationListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_FED_TO_LOCAL_BUDGET_PRESENTATION_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  updateFedToLocalBudgetPresentationData: {
    controllerName: prefix + 'changeThis/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_BUDGET_PRESENTATION_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default budgetPresentation;

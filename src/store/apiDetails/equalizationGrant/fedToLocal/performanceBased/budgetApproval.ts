import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant/gov-to-localbody-approval-of-budget';

const budgetApproval = {
  getFedToLocalBudgetApprovalDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FED_TO_LOCAL_BUDGET_APPROVAL_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalBudgetApprovalData: {
    controllerName: prefix,
    queryKeyName: 'IMPORT_BULK_CSV_FED_TO_LOCAL_BUDGET_APPROVAL',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalBudgetApprovalListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_FED_TO_LOCAL_BUDGET_APPROVAL_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  updateFedToLocalBudgetApprovalData: {
    controllerName: prefix + 'changeThis/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_BUDGET_APPROVAL_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default budgetApproval;

import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/gov-prov-last-year-budget-review';

const budgetReview = {
  createBudgetReviewData: {
    controllerName: prefix,
    queryKeyName: 'CREATE_BUDGET_REVIEW_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getBudgetReviewDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_BUDGET_REVIEW_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default budgetReview;

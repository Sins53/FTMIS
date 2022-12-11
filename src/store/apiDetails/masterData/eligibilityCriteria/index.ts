import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'master_data';

const eligibilityCriteria = {
  getAllEligibilityCriteria: {
    controllerName: prefix + '/eligibility-criteria',
    queryKeyName: 'GET_ALL_ELIGIBILITY_CRITERIA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  toggleEligibilityCriteria: {
    controllerName: prefix + '/eligibility-criteria/{id}/toggle',
    queryKeyName: 'TOGGLE_ELIGIBILITY_CRITERIA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  addNewEligibilityCriteria: {
    controllerName: prefix + '/eligibility-criteria',
    queryKeyName: 'ADD_NEW_ELIGIBILITY_CRITERIA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  editEligibilityCriteria: {
    controllerName: prefix + '/eligibility-criteria/{id}',
    queryKeyName: 'EDIT_ELIGIBILITY_CRITERIA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  getEligibilityCriteriaData: {
    controllerName: prefix + '/eligibility-criteria/{id}',
    queryKeyName: 'GET_ELIGIBILITY_CRITERIA_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default eligibilityCriteria;

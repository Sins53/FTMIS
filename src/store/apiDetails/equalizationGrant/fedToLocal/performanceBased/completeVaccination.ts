import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant/gov-to-localbody-complete-vaccination';

const completeVaccination = {
  getFedToLocalCompleteVaccinationDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FED_TO_LOCAL_COMPLETE_VACCINATION_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalCompleteVaccinationData: {
    controllerName: prefix,
    queryKeyName: 'IMPORT_BULK_CSV_FED_TO_LOCAL_COMPLETE_VACCINATION',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalCompleteVaccinationListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_FED_TO_LOCAL_COMPLETE_VACCINATION_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  updateFedToLocalCompleteVaccinationData: {
    controllerName: prefix + 'changeThis/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_COMPLETE_VACCINATION_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default completeVaccination;

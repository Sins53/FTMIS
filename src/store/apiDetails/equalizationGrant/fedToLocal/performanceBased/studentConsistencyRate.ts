import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant/gov-to-localbody-student-consistency-rate';

const studentConsistencyRate = {
  getFedToLocalStudentConsistencyRateDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FED_TO_LOCAL_STUDENT_CONSISTENCY_RATE_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalStudentConsistencyRateData: {
    controllerName: prefix,
    queryKeyName: 'IMPORT_BULK_CSV_FED_TO_LOCAL_STUDENT_CONSISTENCY_RATE',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalStudentConsistencyRateListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_FED_TO_LOCAL_STUDENT_CONSISTENCY_RATE_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  updateFedToLocalStudentConsistencyRateData: {
    controllerName: prefix + 'changeThis/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_STUDENT_CONSISTENCY_RATE_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default studentConsistencyRate;

import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant/gov-to-localbody-pregnancy-test';

const pregnancyTest = {
  getFedToLocalPregnancyTestDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FED_TO_LOCAL_PREGNANCY_TEST_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalPregnancyTestData: {
    controllerName: prefix,
    queryKeyName: 'IMPORT_BULK_CSV_FED_TO_LOCAL_PREGNANCY_TEST',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalPregnancyTestListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_FED_TO_LOCAL_PREGNANCY_TEST_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  updateFedToLocalPregnancyTestData: {
    controllerName: prefix + 'changeThis/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_PREGNANCY_TEST_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default pregnancyTest;

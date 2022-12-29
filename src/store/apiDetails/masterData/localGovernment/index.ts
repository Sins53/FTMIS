import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'master_data';

const localGovernment = {
  getAllLocalGovernmentData: {
    controllerName: prefix + '/local-bodies',
    queryKeyName: 'GET_ALL_LOCAL_GOVERNMENT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },

  addFiscalYearLocalGovernmentData: {
    controllerName: prefix + '/local-body-detail',
    queryKeyName: 'ADD_NEW_FISCAL_YEAR_LOCAL_GOVERNMENT_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  editFiscalYearLocalGovernmentData: {
    controllerName: prefix + '/local-body-detail/{id}',
    queryKeyName: 'EDIT_FISCAL_YEAR_LOCAL_GOVERNMENT_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  getFiscalYearLocalGovernmentData: {
    controllerName: prefix + '/local-body-detail',
    queryKeyName: 'GET_FISCAL_YEAR_LOCAL_GOVERNMENT_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  localGovernmentBulkImport: {
    controllerName: prefix + '/change-this',
    queryKeyName: 'LOCAL_GOVERNMENT_BULK_IMPORT',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getLocalGovernmentListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_LOCAL_GOVERNMENT_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  }
};

export default localGovernment;

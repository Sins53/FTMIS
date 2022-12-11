import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'master_data';

const fiscalYear = {
  getAllFiscalYearData: {
    controllerName: prefix + '/fiscal-year',
    queryKeyName: 'GET_ALL_FISCAL_YEAR_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFiscalYearItem: {
    controllerName: prefix + '/fiscal-year',
    queryKeyName: 'CREATE_FISCAL_YEAR_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  editFiscalYearItem: {
    controllerName: prefix + '/fiscal-year/{id}',
    queryKeyName: 'EDIT_FISCAL_YEAR_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  deleteFiscalYearItem: {
    controllerName: prefix + '/fiscal-year/{id}',
    queryKeyName: 'DELETE_FISCAL_YEAR_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  },
  toggleFiscalYearStatus: {
    controllerName: prefix + '/fiscal-year/{id}/status',
    queryKeyName: 'TOGGLE_FISCAL_YEAR_STATUS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  }
};

export default fiscalYear;

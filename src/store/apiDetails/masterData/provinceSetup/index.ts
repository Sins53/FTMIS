import { RequestBodyType, RequestMethod } from '../../request';
const prefix = 'master_data';
const province = {
  addNewProvince: {
    controllerName: prefix + '/province/create',
    queryKeyName: 'ADD_NEW_PROVINCE',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  editProvinceById: {
    controllerName: prefix + '/province/{id}/update',
    queryKeyName: 'EDIT_PROVINCE_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  deleteProvinceById: {
    controllerName: prefix + '/province/{id}/delete',
    queryKeyName: 'DELETE_PROVINCE_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  },
  provinceBulkImport: {
    controllerName: prefix + '/province-bulk-upload',
    queryKeyName: 'IMPORT_BULK_PROVINCE',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },

  addFiscalYearProvinceData: {
    controllerName: prefix + '/province-detail',
    queryKeyName: 'ADD_NEW_FISCAL_YEAR_PROVINCE_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  editFiscalYearProvinceData: {
    controllerName: prefix + '/province-detail/{id}',
    queryKeyName: 'EDIT_FISCAL_YEAR_PROVINCE_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  getFiscalYearProvinceData: {
    controllerName: prefix + '/province-detail',
    queryKeyName: 'GET_FISCAL_YEAR_PROVINCE_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};
export default province;

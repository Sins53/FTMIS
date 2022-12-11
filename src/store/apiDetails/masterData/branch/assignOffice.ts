import { RequestBodyType, RequestMethod } from '../../request';
const prefix = 'master_data';

const assignOffice = {
  assignHeadOffice: {
    controllerName: prefix + '/branch/assign_headoffice',
    queryKeyName: 'ASSIGN_HEAD_OFFICE ',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  assignProvinceOffice: {
    controllerName: prefix + '/branch/assign_province_office',
    queryKeyName: 'ASSIGN_PROVINCE_OFFICE ',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  getOffices: {
    controllerName: prefix + '/offices',
    queryKeyName: 'GET_OFFICES_OFFICE ',
    requestBodyType: RequestBodyType.AUTH
  }
};
export default assignOffice;

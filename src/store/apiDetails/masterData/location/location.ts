import { RequestBodyType } from '../../request';
const prefix = 'master_data';
const location = {
  getAllProvince: {
    controllerName: prefix + '/provinces',
    queryKeyName: 'GET_ALL_PROVINCE_DATA',
    requestBodyType: RequestBodyType.AUTH
  },
  getAllDistrict: {
    controllerName: prefix + '/districts',
    queryKeyName: 'GET_ALL_DISTRICT_DATA',
    requestBodyType: RequestBodyType.AUTH
  },
  getAllLocalBody: {
    controllerName: prefix + '/localbodies',
    queryKeyName: 'GET_ALL_LOCALBODY_DATA',
    requestBodyType: RequestBodyType.AUTH
  }
};
export default location;

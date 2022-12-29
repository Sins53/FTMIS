import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/gov-prov-vehicle-tax';

const vehicleTax = {
  createVehicleTaxData: {
    controllerName: prefix,
    queryKeyName: 'CREATE_VEHICLE_TAX_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getVehicleTaxDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_VEHICLE_TAX_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default vehicleTax;

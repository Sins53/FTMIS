import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/vehicle-tax-indicator';

const vehicleTax = {
  createVehicleTaxData: {
    controllerName: prefix + '-create',
    queryKeyName: 'CREATE_VEHICLE_TAX_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getVehicleTaxDetails: {
    controllerName: prefix + '-list',
    queryKeyName: 'GET_VEHICLE_TAX_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default vehicleTax;

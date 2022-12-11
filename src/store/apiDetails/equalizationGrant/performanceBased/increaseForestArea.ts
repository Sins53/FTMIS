import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/gov-prov-increase-forest-area';

const increaseForestArea = {
  createIncreaseForestAreaData: {
    controllerName: prefix,
    queryKeyName: 'CREATE_INCREASE_FOREST_AREA_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getIncreaseForestAreaDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_INCREASE_FOREST_AREA_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default increaseForestArea;

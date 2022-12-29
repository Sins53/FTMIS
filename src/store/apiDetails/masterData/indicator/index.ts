import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/indicator-detail';

const indicator = {
  createIndicatorMarks: {
    controllerName: prefix + '-bulk-create',
    queryKeyName: 'CREATE_INDICATOR_MARKS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getIndicatorMarks: {
    controllerName: prefix + '-filter',
    queryKeyName: 'GET_INDICATOR_MARKS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default indicator;

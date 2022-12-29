import { RequestBodyType, RequestMethod } from '../../request';
import minimum from './minimum';
import performanceBased from './performanceBased';

const prefix = 'equalization_grant';

const fedToLocal = {
  getPopulationRangeList: {
    controllerName: prefix + '/population-range-list',
    queryKeyName: 'GET_POPULATION_RANGE_LIST',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default { ...fedToLocal, minimum, performanceBased };

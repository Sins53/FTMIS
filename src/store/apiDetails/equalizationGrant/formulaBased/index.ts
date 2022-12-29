import { RequestBodyType, RequestMethod } from '../../request';
import hdi from './hdi';
import mdi from './mdi';
import itAccess from './itAccess';
import revenueCondition from './revenueCondition';
import drinkingWater from './drinkingWater';
import toilet from './toilet';
import electricityAccess from './electricityAccess';
import roadDensity from './roadDensity';
import fiscalGap from './fiscalGap';

const prefix = 'equalization_grant';

const formulaBased = {
  getFormulaBasedGrant: {
    controllerName: prefix + '/formula-based-grant',
    queryKeyName: 'GET_fORMULA_BASED_GRANT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFormulaBasedGrant: {
    controllerName: prefix + '/formula-based-grant',
    queryKeyName: 'CREATE_FORMULA_BASED_GRANT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  updateFormulaBasedGrant: {
    controllerName: prefix + '/formula-based-grant/{id}',
    queryKeyName: 'UPDATE_FORMULA_BASED_GRANT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  getFormulaBasedGrantFinalResult: {
    controllerName: prefix + '/total-grant-distribution',
    queryKeyName: 'GET_fORMULA_BASED_GRANT_FINAL_RESULT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default {
  ...formulaBased,
  hdi,
  mdi,
  itAccess,
  revenueCondition,
  drinkingWater,
  toilet,
  electricityAccess,
  roadDensity,
  fiscalGap
};

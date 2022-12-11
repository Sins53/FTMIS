import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'master_data/declarations';

const declarations = {
  getAllDeclarationsList: {
    controllerName: prefix,
    queryKeyName: 'GET_ALL_DECLARATIONS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getDeclarationsById: {
    controllerName: prefix,
    queryKeyName: 'GET_DECLARATIONS_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  updateDeclarations: {
    controllerName: prefix + '/{id}',
    queryKeyName: 'UPDATE_DECLARATIONS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default declarations;

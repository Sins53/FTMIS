import { RequestBodyType, RequestMethod, screenPrefix } from '../request';

const occupation = {
  getOccupationtList: {
    controllerName: screenPrefix.masterData + '/occupation/list',
    queryKeyName: 'GET_ALL_OCCUPATION_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createOccupationtItem: {
    controllerName: screenPrefix.masterData + '/occupation/create',
    queryKeyName: 'CREATE_OCCUPATION_ITEM',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  editOccupationtItem: {
    controllerName: screenPrefix.masterData + '/occupation/{id}/update',
    queryKeyName: 'EDIT_OCCUPATION_ITEM',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  deleteOccupationtItem: {
    controllerName: screenPrefix.masterData + '/occupation/{id}/delete',
    queryKeyName: 'DELETE_OCCUPATION_ITEM',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  }
};

export default occupation;

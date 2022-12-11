import { RequestBodyType, RequestMethod } from '../../request';

const categories = {
  getAllCategory: {
    controllerName: '/category',
    queryKeyName: 'GET_ALL_CATEGORY_DATA',
    requestBodyType: RequestBodyType.AUTH
  },
  getCategoryDetailsById: {
    controllerName: '/category/{id}',
    queryKeyName: 'GET_CATEGORY_DATA_BY_ID',
    requestBodyType: RequestBodyType.AUTH
  },
  editCategoryById: {
    controllerName: '/category/{id}',
    queryKeyName: 'EDIT_CATEGORY_DATA_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  addNewCategory: {
    controllerName: '/category',
    queryKeyName: 'ADD_CATEGORY_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  deleteCategoryById: {
    controllerName: '/category/{id}',
    queryKeyName: 'DELETE_CATEGORY_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  }
};

export default categories;

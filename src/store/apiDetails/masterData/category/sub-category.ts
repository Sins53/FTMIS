import { RequestBodyType, RequestMethod } from '../../request';

const subCategory = {
  getAllSubCategories: {
    controllerName: '/sub-category',
    queryKeyName: 'GET_ALL_SUB_CATEGORIES',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getSubCategoryById: {
    controllerName: '/sub-category/{id}',
    queryKeyName: 'GET_SUB_CATEGORY_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  updateSubCategoryById: {
    controllerName: '/sub-category/{id}',
    queryKeyName: 'UPDATE_SUB_CATEGORY_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  deleteSubCategoryById: {
    controllerName: '/sub-category/{id}',
    queryKeyName: 'DELETE_SUB_CATEGORY_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  },
  addSubCategory: {
    controllerName: '/sub-category',
    queryKeyName: 'ADD_SUB_CATEGORY',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  }
};

export default subCategory;

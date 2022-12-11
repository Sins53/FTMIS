import { RequestBodyType, RequestMethod } from '../../request';
const prefix = 'master_data';

const branches = {
  getAllBranch: {
    controllerName: prefix + '/branch/list',
    queryKeyName: 'GET_ALL_BRANCH_DATA',
    requestBodyType: RequestBodyType.AUTH
  },
  editBranchById: {
    controllerName: prefix + '/branch/{id}/update',
    queryKeyName: 'EDIT_BRANCH_DATA_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  addNewBranch: {
    controllerName: prefix + '/branch/create',
    queryKeyName: 'ADD_BRANCH_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  deleteBranchById: {
    controllerName: prefix + '/branch/{id}/delete',
    queryKeyName: 'DELETE_BRANCH_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  },
  branchBulkImport: {
    controllerName: prefix + '/branch-bulk-upload',
    queryKeyName: 'BRANCH_BULK_IMPORT',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  }
};
export default branches;

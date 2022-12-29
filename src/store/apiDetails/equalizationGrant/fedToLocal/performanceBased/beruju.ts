import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant/gov-to-localbody-beruju-condition';

const beruju = {
  getFedToLocalBerujuDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FED_TO_LOCAL_BERUJU_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalBerujuData: {
    controllerName: prefix,
    queryKeyName: 'IMPORT_BULK_CSV_FED_TO_LOCAL_BERUJU',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalBerujuListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_FED_TO_LOCAL_BERUJU_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  updateFedToLocalBerujuData: {
    controllerName: prefix + 'changeThis/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_BERUJU_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default beruju;

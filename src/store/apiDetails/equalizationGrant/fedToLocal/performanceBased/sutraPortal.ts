import { RequestBodyType, RequestMethod } from '../../../request';

const prefix = 'equalization_grant/gov-to-localbody-sutra-portal';

const sutraPortal = {
  getFedToLocalSutraPortalDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_FED_TO_LOCAL_SUTRA_PORTAL_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createFedToLocalSutraPortalData: {
    controllerName: prefix,
    queryKeyName: 'IMPORT_BULK_CSV_FED_TO_LOCAL_SUTRA_PORTAL',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getFedToLocalSutraPortalListCSV: {
    controllerName: 'change-this',
    queryKeyName: 'GET_FED_TO_LOCAL_SUTRA_PORTAL_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  updateFedToLocalSutraPortalData: {
    controllerName: prefix + 'changeThis/{id}',
    queryKeyName: 'UPDATE_FED_TO_LOCAL_SUTRA_PORTAL_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default sutraPortal;

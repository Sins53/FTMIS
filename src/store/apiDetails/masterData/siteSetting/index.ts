import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'master_data';

const siteSetting = {
  getAllSiteSettings: {
    controllerName: prefix + '/base-config',
    queryKeyName: 'GET_ALL_SITE_SETTINGS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  createSiteSettings: {
    controllerName: prefix + '/base-config',
    queryKeyName: 'CREATE_SITE_SETTINGS',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  editSiteSettings: {
    controllerName: prefix + '/base-config/{id}',
    queryKeyName: 'EDIT_SITE_SETTINGS',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.PUT
  }
};

export default siteSetting;

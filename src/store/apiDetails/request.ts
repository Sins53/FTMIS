export enum RequestMethod {
  GET = 'GET',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  PURGE = 'PURGE',
  LINK = 'LINK',
  UNLINK = 'UNLINK'
}

export enum RequestBodyType {
  /**If request id in application/x-www-form-urlencoded as string*/
  QUERYSTRING = 'QUERY-STRING',
  /**If request is in formdata*/
  FORMDATA = 'FORM-DATA',
  /**If request requires Bearer*/
  AUTH = 'AUTH',
  /**If request is open*/
  NOAUTH = 'NO-AUTH',
  FILE = 'FILE'
}

export const screenPrefix = {
  masterData: 'master_data'
};

import { RequestBodyType } from '../request';
const docsPrifix = 'document_management';

const individualDocument = {
  getMinimalDocumentList: {
    controllerName: docsPrifix + '/document/{form_type}/uploads/{form_id}',
    queryKeyName: 'GET_MINIMAL_DOCS_LIST',
    requestBodyType: RequestBodyType.AUTH
  },
  getApplicantDocumentList: {
    controllerName: docsPrifix + '/applicant-document/list/{form_id}',
    queryKeyName: 'GET_APPLICANT_DOCS_LIST',
    requestBodyType: RequestBodyType.AUTH
  }
};

export default individualDocument;

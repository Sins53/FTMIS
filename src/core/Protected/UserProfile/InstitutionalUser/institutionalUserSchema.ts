import { BasicResponse } from '@/helper/default-action';

export interface InstitutionalUserData {
  id?: number;
  institution_name: string;
  institution_name_np: string;
  registration_number: number | string;
  registered_authority: string;
  registered_date: string;
  registered_address: string;
  pan_number: string;
  landline_number: string;
  business_type: BusinessTypeData;
  image: string;
}

interface BusinessTypeData {
  id: number | string;
  business_type: string;
}

export interface InstitutionalDataByIdResponse extends BasicResponse {
  data: InstitutionalUserData;
}

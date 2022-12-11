import { BasicResponse } from '@/helper/default-action';

export interface IndividualUserData {
  id?: number;
  honorific_title?: number;
  first_name: string;
  first_name_np?: string;
  middle_name?: string;
  middle_name_np?: string;
  last_name: string;
  last_name_np?: string;
  date_of_birth?: string;
  landline_number?: string;
  father_name?: string;
  father_name_np?: string;
  grandfather_name?: string;
  grandfather_name_np?: string;
  father_in_law_name?: string;
  father_in_law_name_np?: string;
  marital_status: MaritalStatus;
  spouse_name?: string;
  spouse_name_np?: string;
  dependent_parent_number?: number;
  dependent_child_number?: number;
  picture?: string;
  gender?: string;
}

interface MaritalStatus {
  id: string;
  name: string;
}
export interface IndividualDataByIdResponse extends BasicResponse {
  data: IndividualUserData;
}

/// <reference types="react-scripts" />
/// <reference types="@welldone-software/why-did-you-render" />

// for api params

interface OptionValues {
  id: number;
  name: string;
}
interface OptionValuesWithType extends OptionValues {
  type: string;
}

interface OptionValuesWithLanguage {
  id: number | null;
  name_en: string;
  name_np: string;
}

interface params {
  page?: number | string;
  page_size?: number | string;
  sort?: string;
  otherValue?: {
    escapePg?: boolean;
    include?: string;
    formType?: 'master' | 'requisition';
    option?: string;
    isRequisition?: boolean;
  };
  escapePg?: bool;
  include?: string;
  search?: string;
}
interface PaginatedParams {
  page?: number | string;
  page_size?: number | string;
  sort?: string;
  otherValue?: {
    escapePg?: boolean;
    include?: string;
    formType?: 'master' | 'requisition';
    option?: string;
    isRequisition?: boolean;
  };
  escape_pg?: bool;
  include?: string;
  search?: string;
}

/**
 * Primitive types
 */
type Primitive = string | boolean | number;

// type define for useLocation
interface ILocation<S extends State = State> {
  pathname: string;
  search: string;
  hash: string;
  state: S;
  key: string;
}

// type define for useNavigate
interface INavigate {
  (to: To, options?: { replace?: boolean; state?: any }): void;
  (delta: number): void;
}

type RequestDataType = Primitive & (File | Array | { [key: string]: RequestData });
type RequestDataType = Primitive & (File | Array | { [key: string]: RequestData });
/**
 * Default Redux Action
 */
interface DefaultAction<TPayload = RequestDataType> {
  type: string;
  payload?: TPayload;
}
interface DefaultState<TData = RequestDataType> {
  data: TData;
  message: string;
  isFetching: boolean;
  isFailed: boolean;
  isSuccess: boolean;
  status: boolean;
}
interface DefaultDispatchType {
  progressDispatch: string;
  successDispatch: string;
  failureDispatch: string;
}

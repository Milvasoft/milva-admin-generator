
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';

export interface IResult<T> {
  success: boolean;
  message: string;
  statusCode?: number;
  result: T;
  errorCodes?: Array<number>;
}

export type Result<T = any, Response = IResult<T>> = Response

export interface ApiParams {
  url: string;
  headers?: any;
  queryString?: string;
  data?: any;
  params?: string | number | boolean;
  backDrop?: boolean;
  rejectable?: boolean;
  successMessaging?: boolean;
  errorMessaging?: boolean;
  version?: string;
}

export default interface NetworkParams extends ApiParams {
  method?: Method;
  // eslint-disable-next-line semi
}

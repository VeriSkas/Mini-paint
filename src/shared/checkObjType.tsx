import { ErrorResponse, SuccessLoginResponse } from './interfaces';

export function instanceOfSuccessLoginResponse(object: any): object is SuccessLoginResponse {
  return 'user' in object;
}

export function instanceOfErrorResponse(object: any): object is ErrorResponse {
  return 'error' in object;
}

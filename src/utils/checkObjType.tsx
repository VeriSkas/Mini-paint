import { ErrorResponse, SuccessLoginResponse } from '@interfaces/interfaces';

export function instanceOfSuccessLoginResponse(object: object): object is SuccessLoginResponse {
  return 'user' in object;
}

export function instanceOfErrorResponse(object: object): object is ErrorResponse {
  return 'error' in object;
}

import { RaveError } from '../types'

/**
 * throw a Rave Error
 * @param  {RaveError} data
 */
export const throwError = (data: RaveError): any => {
  throw data
}

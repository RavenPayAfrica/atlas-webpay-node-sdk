import Axios, { AxiosInstance } from 'axios'
/**
 * create an axios instance to make request
 * @param  {object} headers?
 * @returns AxiosInstance
 */
export const request = (baseUrl: string, headers?: object): AxiosInstance => {
  return Axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })
}

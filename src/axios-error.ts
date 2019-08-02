import { AxiosError, AxiosResponse } from 'axios'

export function makeAxiosError(response?: AxiosResponse): AxiosError {
  return {
    name: '',
    message: '',
    config: {},
    response,
    isAxiosError: false,
  }
}

export function makeAxiosResponse(data: object = {}, status: number = 400): AxiosResponse {
  return {
    data,
    status,
    statusText: 'status text',
    headers: undefined,
    config: {},
  }
}

export function makeAxiosErrorResponse(data: object = {}, status: number = 400): AxiosError {
  return makeAxiosError(makeAxiosResponse(data, status))
}

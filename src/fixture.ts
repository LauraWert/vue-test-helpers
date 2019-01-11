import { AxiosPromise, AxiosResponse } from 'axios'
import fs from 'fs'

export default <T>(filename: string): Promise<T> => {
  return readFixture<T>(filename, (data: T) => data)
}

export function fixtureResponse<T>(filename: string): AxiosPromise<T> {
  return readFixture<T, AxiosResponse<T>>(filename, (data: T) => ({
    data,
    status: 200,
    statusText: 'ok',
    headers: [],
    config: {},
  }))
}

function readFixture<T, R = T>(filename: string, formatData: (data: T) => R): Promise<R> {
  return new Promise((
    resolve: (_: R) => void,
    reject: (_: NodeJS.ErrnoException) => void,
  ): void => {

    const path = require.resolve('tests/fixtures/' + filename + '.json')
    fs.readFile(
      path,
      (err: NodeJS.ErrnoException, data: Buffer) => {
        if (err) reject(err)
        resolve(formatData(JSON.parse(data.toString())))
      })
  })
}

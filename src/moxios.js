export function testMoxiosCall (moxios, method, url, data) {
  const request = moxios.requests.get(method, url)
  expect(request).toBeDefined()

  expect(request.config.url).toBe(url)
  expect(request.config.method).toBe(method)

  if (typeof data !== 'undefined' && data.length !== 0) {
    expect(request.config.data).toBe(JSON.stringify(data))
  }
}

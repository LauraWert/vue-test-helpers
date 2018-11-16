import { mockLocalStorage } from 'src/local-storage-mock'

describe('local-storage-mock', () => {
  beforeEach(() => {
    mockLocalStorage()
  })
  it('can set and get an item', () => {
    window.localStorage.setItem('my_key', 'my value')

    expect(window.localStorage.getItem('my_key')).to.be('my value')
  })
}

import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication',() => {
  it('Shoul call HttpClient with correct URL',() => {
    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url,httpPostClientSpy)

    sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})

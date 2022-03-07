import { HttpPostClientSpy } from '@data/test/mock-http-client'
import { RemoteAuthentication } from '@data/usecases/authentication/remote-authentication'
import faker from 'faker'
import { mockAuthentication } from '@domain/test/mock-authentication'

type SutTypes = {
  remoteAuthentication: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}
const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const remoteAuthentication = new RemoteAuthentication(url,httpPostClientSpy)
  return {
    remoteAuthentication,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication',() => {
  it('Shoul call HttpClient with correct URL',() => {
    const url = faker.internet.url()
    const { remoteAuthentication,httpPostClientSpy } = makeSut(url)
    remoteAuthentication.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  it('Should call HttpClient with correct body',() => {
    const authenticationParams = mockAuthentication()
    const { remoteAuthentication,httpPostClientSpy } = makeSut()
    remoteAuthentication.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })
})

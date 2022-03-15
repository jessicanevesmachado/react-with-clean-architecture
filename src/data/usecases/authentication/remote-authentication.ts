import { HttpStatusCode } from '@data/protocols/http/http-response'
import { InvalidCredentialsError } from '@domain/errors/InvalidCredentialsError'
import { UnexpectedError } from '@domain/errors/UnexpectedError'
import { AuthenticationParams } from '../../../domain/usecase/authentication'
import { HttpPostClient } from '../../protocols/http/http-post-client'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    const HttpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (HttpResponse.statusCode) {
      case HttpStatusCode.ok:
        break
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}

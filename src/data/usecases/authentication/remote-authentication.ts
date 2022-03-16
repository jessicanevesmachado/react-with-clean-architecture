import { HttpStatusCode, HttpPostClient } from "@data/protocols/http/";
import { InvalidCredentialsError, UnexpectedError } from "@domain/errors/";
import { AccountModel } from "@domain/models/";
import { AuthenticationParams } from "@domain/usecase/authentication";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const HttpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (HttpResponse.statusCode) {
      case HttpStatusCode.ok:
        return HttpResponse.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}

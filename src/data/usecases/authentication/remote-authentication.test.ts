import { HttpPostClientSpy } from "@data/test/mock-http-client";
import { RemoteAuthentication } from "@data/usecases/authentication/remote-authentication";
import faker from "faker";
import { mockAuthentication } from "@domain/test/mock-authentication";
import { InvalidCredentialsError } from "@domain/errors/InvalidCredentialsError";
import { HttpStatusCode } from "@data/protocols/http/http-response";
import { UnexpectedError } from "@domain/errors/UnexpectedError";
import { AuthenticationParams } from "@domain/usecase/authentication";
import { AccountModel } from "@domain/models/account-model";

type SutTypes = {
  remoteAuthentication: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};
const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >();
  const remoteAuthentication = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    remoteAuthentication,
    httpPostClientSpy,
  };
};

describe("RemoteAuthentication", () => {
  it("Shoul call HttpClient with correct URL", async () => {
    const url = faker.internet.url();
    const { remoteAuthentication, httpPostClientSpy } = makeSut(url);
    remoteAuthentication.auth(mockAuthentication());
    await expect(httpPostClientSpy.url).toBe(url);
  });

  it("Should call HttpClient with correct body", async () => {
    const authenticationParams = mockAuthentication();
    const { remoteAuthentication, httpPostClientSpy } = makeSut();
    remoteAuthentication.auth(authenticationParams);
    await expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  it("Should throw invalidCredentialsError if HttpPostClient returns 401", async () => {
    const { remoteAuthentication, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promisse = remoteAuthentication.auth(mockAuthentication());
    await expect(promisse).rejects.toThrow(new InvalidCredentialsError());
  });

  it("Should throw error if HttpPostClient returns 400", async () => {
    const { remoteAuthentication, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promisse = remoteAuthentication.auth(mockAuthentication());
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });

  it("Should throw error if HttpPostClient returns 404", async () => {
    const { remoteAuthentication, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promisse = remoteAuthentication.auth(mockAuthentication());
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });

  it("Should throw error if HttpPostClient returns 500", async () => {
    const { remoteAuthentication, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promisse = remoteAuthentication.auth(mockAuthentication());
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });
});

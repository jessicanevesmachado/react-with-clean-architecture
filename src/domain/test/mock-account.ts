import { AccountModel } from "@domain/models/account-model";
import { AuthenticationParams } from "@domain/usecase/authentication";
import faker from "faker";

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  acessToken: faker.random.uuid(),
});

import { AccountModel } from "@domain/models";
import { AuthenticationParams } from "@domain/usecase";
import faker from "faker";

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  acessToken: faker.random.uuid(),
});

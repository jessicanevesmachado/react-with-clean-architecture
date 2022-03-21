import { AxiosHttpClient } from "./axios-http-client";
import axios from "axios";
import faker from "faker";
jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

describe("AxiosHttpClient", () => {
  it("Should call axios with correct URL and VERB", async () => {
    const sut = makeSut();
    const url = faker.internet.url();
    sut.post({ url });
    expect(mockedAxios.post).toHaveBeenCalledWith(url);
  });
});

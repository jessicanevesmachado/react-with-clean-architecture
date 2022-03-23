import { mockPostRequest } from "@data/test/mock-http-post";
import axios from "axios";
import { mockeAxios } from "../test/mock-axios";
import { AxiosHttpClient } from "./axios-http-client";
jest.mock("axios");

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};
const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockeAxios();

  return { sut, mockedAxios };
};

describe("AxiosHttpClient", () => {
  it("Should call axios with correct values", async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  it("Should return de correct status code and body", async () => {
    const { sut, mockedAxios } = makeSut();
    const promisse = sut.post(mockPostRequest());
    expect(promisse).toEqual(mockedAxios.post.mock.results[0].value);
  });
});

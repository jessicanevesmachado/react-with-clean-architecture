import axios from "axios";
import faker from "faker";

export const mockeAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>; // moca para usar as funções do axios

  mockedAxios.post.mockResolvedValue({
    data: faker.random.objectElement(),
    status: faker.random.number(),
  });

  return mockedAxios;
};

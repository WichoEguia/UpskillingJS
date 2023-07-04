import axios, { AxiosError } from 'axios';

const BASE_URL = `https://jsonplaceholder.typicode.com`;
const MAX_RETRIES = 5;

export async function request<Type>(
  path: string
): Promise<Awaited<Type | undefined>> {
  let retryCount = 0;
  let error: AxiosError | undefined;
  while (retryCount < MAX_RETRIES) {
    try {
      const response = await axios.get(BASE_URL + path);
      return response.data;
    } catch (err) {
      retryCount++;
      error = err as AxiosError;
    }
  }
  if (error) throw new Error(`Request failed: ${error.message}`);
}

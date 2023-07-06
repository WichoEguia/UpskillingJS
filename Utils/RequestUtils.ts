import axios, { AxiosError } from 'axios';
import { Post } from '../Models/Post';
import { User } from '../Models/User';

const BASE_URL = `https://jsonplaceholder.typicode.com`;
const MAX_RETRIES = 5;

async function request<Type>(path: string): Promise<Awaited<Type | undefined>> {
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

export async function getPosts(): Promise<Post[]> {
  return await request<Post[]>('/posts');
}

export async function getUserById(userId: number): Promise<User> {
  return await request<User>(`/users/${userId}`);
}

export async function getUsers(): Promise<User[]> {
  return await request<User[]>('/users');
}

export async function getUserPosts(userId: number): Promise<Post[]> {
  return await request<Post[]>(`/users/${userId}/posts`);
}

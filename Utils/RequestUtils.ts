import axios, { AxiosError } from 'axios';
import { Post } from '../Models/Post';
import { User } from '../Models/User';

async function request<Type>(path: string): Promise<Awaited<Type | undefined>> {
  let retryCount = 0;
  let error: AxiosError | undefined;
  const maxRetries = parseInt(process.env.MAX_RETRIES) || 3;
  while (retryCount < maxRetries) {
    try {
      const response = await axios.get(process.env.BASE_URL + path);
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

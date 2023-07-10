import { UserPostsResponseDto } from '../Dto/UserPostsResponseDto';
import { UsersDataResponseDto } from '../Dto/UsersDataResponseDto';
import {
  mapGetUserPostsResponse,
  mapGetUsersResponse,
} from '../Utils/MappingUtils';
import { getUserById, getUserPosts, getUsers } from '../Utils/RequestUtils';

export class UserService {
  public async getUsers(): Promise<UsersDataResponseDto> {
    const usersResponse = await getUsers();
    return mapGetUsersResponse(usersResponse);
  }

  public async getUserPost(userId: number): Promise<UserPostsResponseDto> {
    const [userData, postsResponse] = await Promise.all([
      getUserById(userId),
      getUserPosts(userId),
    ]);
    return mapGetUserPostsResponse(userData, postsResponse);
  }
}

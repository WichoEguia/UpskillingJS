import { SearchPostDto } from '../Dto/SearchPostResponseDto';
import { UserPostsResponseDto } from '../Dto/UserPostsResponseDto';
import { UsersDataResponseDto } from '../Dto/UsersDataResponseDto';
import { Address } from '../Models/Address';
import { Post } from '../Models/Post';
import { User } from '../Models/User';

function getFullAddress({ street, suite, city, zipcode }: Address): string {
  return `[${street}] [${suite}] [${city}] [${zipcode}]`;
}

function getCoordinatesPair({ geo }: Address): string {
  return `(${geo.lat}, ${geo.lng})`;
}

export function mapSearchPostResponse(
  post: Post,
  email: string
): SearchPostDto {
  return {
    response: {
      msg: null,
      post: {
        postId: post?.id,
        body: post?.body,
        email: email,
      },
    },
  };
}

export function mapGetUsersResponse(
  usersResponse: User[]
): UsersDataResponseDto {
  return {
    response: usersResponse
    .filter((user) => !!user)
    .map((user) => {
      const [firstName, lastName] = user.name.split(' ');
      return {
        id: user.id,
        prefix: 'Mr.', // TODO: How can I get this value?
        firstName,
        lastName,
        email: user.email,
        address: getFullAddress(user.address),
        geolocation: getCoordinatesPair(user.address),
        companyName: user.company.name,
      };
    })
  }
}

export function mapGetUserPostsResponse(
  userData: User,
  postsData: Post[]
): UserPostsResponseDto {
  return {
    response: postsData
    ?.filter((post) => !!post && post.body.length > 120)
    .map((post) => {
      return {
        userId: post.userId,
        name: userData?.name,
        email: userData?.email,
        postId: post.id,
        title: post.title,
        body: post.body,
      };
    })
  }
}

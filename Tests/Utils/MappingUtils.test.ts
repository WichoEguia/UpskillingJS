import { Post } from '../../Models/Post';
import { User } from '../../Models/User';
import {
  mapGetUserPostsResponse,
  mapGetUsersResponse,
  mapSearchPostResponse,
} from '../../Utils/MappingUtils';

test('Should map SearchPostDto', () => {
  const email = 'mail@mail.com';
  const post: Post = {
    userId: 111,
    id: 222,
    title: 'New amazing post',
    body: 'Not amazing enought :(',
  };
  const response = mapSearchPostResponse(post, email);
  expect(response.response.msg).toBeNull();
  expect(response.response.post?.email).toEqual(email);
  expect(response.response.post?.postId).toEqual(post.id);
});

test('Should map UsersDataResponseDto', () => {
  const users: User[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    },
    {
      id: 2,
      name: 'Leanne Graham 2',
      username: 'Bret',
      email: 'Sincere2@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    },
  ];
  const response = mapGetUsersResponse(users);
  expect(response.response).toHaveLength(2);
  expect(response.response[1].email).toEqual('Sincere2@april.biz');
});

test('Should map UserPostsResponseDto', () => {
  const user: User = {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  };
  const post: Post[] = [
    {
      userId: 111,
      id: 222,
      title: 'New amazing post',
      body: 'Not amazing enought :(',
    },
    {
      userId: 222,
      id: 333,
      title: 'New amazing post 2',
      body: 'I\'m amazing because I\'m up to the 102 characters xd. I like turtles. I need to get at least 120 (one hundred twenty) characters to pass the filter conditon xd',
    },
  ];
  const response = mapGetUserPostsResponse(user, post);
  expect(response.response).toHaveLength(1);
  expect(response.response[0].userId).toEqual(222);
});

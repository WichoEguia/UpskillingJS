import axios from 'axios';
import {
  getPosts,
  getUserById,
  getUserPosts,
  getUsers,
} from '../../Utils/RequestUtils';

jest.mock('axios');

test('Should get a all posts', async () => {
  (axios.get as jest.Mock).mockResolvedValue({
    data: [
      {
        userId: 1,
        id: 1,
        title: 'Post title',
        body: 'Post obdy xd',
      },
    ],
  });
  const result = await getPosts();
  expect(result[0].title).toEqual('Post title');
});

test('Should get a all users', async () => {
  (axios.get as jest.Mock).mockResolvedValue({
    data: [
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
    ],
  });
  const users = await getUsers();
  expect(users).toHaveLength(1);
  expect(users[0].email).toEqual('Sincere@april.biz');
});

test('Should get user by id', async () => {
  (axios.get as jest.Mock).mockResolvedValue({
    data: {
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
  });
  const user = await getUserById(1);
  expect(user.email).toEqual('Sincere@april.biz');
});

test('Should get user posts', async () => {
  (axios.get as jest.Mock).mockResolvedValue({
    data: [
      {
        userId: 1,
        id: 1,
        title: 'Post 1',
        body: 'Post body 1',
      },
      {
        userId: 1,
        id: 2,
        title: 'Post 2',
        body: 'Post body 2',
      },
      {
        userId: 1,
        id: 3,
        title: 'Post 3',
        body: 'Post body 3',
      },
    ],
  });
  const posts = await getUserPosts(1);
  expect(posts).toHaveLength(3);
  expect(posts[2].title).toEqual('Post 3');
});

test('Should fail doing a request', () => {
  (axios.get as jest.Mock).mockImplementation(() => {
    throw new Error('Mocked error');
  });
  expect(async () => await getUserPosts(1)).rejects.toThrow(Error);
});

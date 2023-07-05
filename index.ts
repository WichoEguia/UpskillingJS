import express from 'express';
import dotenv from 'dotenv';

import { AuthController } from './Controllers/AuthController';
import { UsersController } from './Controllers/UsersController';
import { PostsController } from './Controllers/PostsController';
import { authenticateUser } from './Middlewares/Authentication';

dotenv.config();

const APP = express();

APP.use(express.json());

const authController = new AuthController();
const usersController = new UsersController();
const postsController = new PostsController();

APP.get('/', (req, res) => {
  res.send('Hello world');
});

APP.get('/login', (req, res) => authController.login(req, res));

APP.get('/users', authenticateUser, (req, res) =>
  usersController.getUsers(req, res)
);

APP.get('/users/:userId/posts', authenticateUser, (req, res) =>
  usersController.getUserPosts(req, res)
);

APP.get('/posts', authenticateUser, (req, res) =>
  postsController.searchPost(req, res)
);

APP.listen(PORT, () => {
  console.log(`Starting server in port ${process.env.PORT}`);
});

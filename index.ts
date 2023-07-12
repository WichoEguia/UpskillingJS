import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import AuthController from './Controllers/AuthController';
import UsersController from './Controllers/UsersController';
import PostsController from './Controllers/PostsController';
import authenticateUser from './Middlewares/Authentication';
import logToDB from './Middlewares/Logger';

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

APP.get('/users', [authenticateUser, logToDB], (req: Request, res: Response) =>
  usersController.getUsers(req, res)
);

APP.get(
  '/users/:userId/posts',
  [authenticateUser, logToDB],
  (req: Request, res: Response) => usersController.getUserPosts(req, res)
);

APP.get('/posts', [authenticateUser, logToDB], (req: Request, res: Response) =>
  postsController.searchPost(req, res)
);

APP.listen(process.env.PORT, () => {
  console.log(`Starting server in port ${process.env.PORT}`);
});

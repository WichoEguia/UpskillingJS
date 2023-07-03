import express from 'express';

import { AuthController } from './Controllers/AuthController';
import { UsersController } from './Controllers/UsersController';
 
const APP = express();
const PORT: number = 3000;

APP.use(express.json());

const authController = new AuthController();
const usersController = new UsersController();

APP.get('/', (req, res) => {
    res.send("Hello world");
});

APP.get('/login', (req, res) => authController.login(req, res));

APP.get('/users', (req, res) => usersController.getUsers(req, res));

APP.listen(PORT, () => {
    console.log(`Starting server in port ${PORT}`);
});
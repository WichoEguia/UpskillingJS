import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserDto } from '../Dto/LoginDto';

export default class AuthController {
  public login(req: Request, res: Response) {
    const { userId, role }: UserDto = req.body;
    const key = process.env.TOP_SECRET_FIRM || 'defaultKey';
    const token = jwt.sign({ userId, role }, key, {
      expiresIn: '1h',
    });
    res.json({ token, expiresIn: '1h' });
  }
}

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserDto } from '../Dto/LoginDto';

export class AuthController {
  public login(req: Request, res: Response) {
    const { userId, role }: UserDto = req.body;
    const token = jwt.sign({ userId, role }, process.env.TOP_SECRET_FIRM, {
      expiresIn: '1h',
    });
    res.json({ token, expiresIn: '1h' });
  }
}

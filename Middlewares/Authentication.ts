import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserDto } from '../Dto/LoginDto';

export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;
  if (!token)
    return res.status(400).json({ message: 'missing autherization token' });

  jwt.verify(token, process.env.TOP_SECRET_FIRM, (err: VerifyErrors, user: UserDto) => {
    if (err) {
      return res.status(403)
        .json({ msg: (err as VerifyErrors).message });
    }

    if (user.role !== 'ADMIN') {
      return res.status(403)
        .json({ msg: 'User not allowed' });
    }
    
    req.user = user;
    next();
  });
}

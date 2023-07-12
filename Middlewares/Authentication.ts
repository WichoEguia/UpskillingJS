import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserDto } from '../Dto/LoginDto';

export default function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;
  if (!token)
    return res.status(400).json({ message: 'missing autherization token' });

  jwt.verify(
    token,
    process.env.TOP_SECRET_FIRM || 'defaultKey',
    (err: VerifyErrors, user: UserDto): void => {
      if (err) {
        res.status(403).json({
          error: {
            msg: (err as VerifyErrors).message,
          },
        });
      }

      if (user.role !== 'ADMIN') {
        res.status(403).json({
          error: {
            msg: 'User not allowed',
          },
        });
      }

      req.user = user;
      next();
    }
  );
}

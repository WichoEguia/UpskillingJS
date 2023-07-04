import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const TOP_SECRET_FIRM = 'SuperSecretFirm';

export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;
  if (!token)
    return res.status(400).json({ message: 'missing autherization token' });

  jwt.verify(token, TOP_SECRET_FIRM, (err, user: UserDto) => {
    if (err || user.role !== 'ADMIN') return res.status(403);
    req.user = user;
    next();
  });
}

import { Request, Response, NextFunction } from 'express';
import insertLogToCollectoin from '../Utils/LoggerUtils';

export default function logToDB(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.on('finish', () => {
    console.log('Finished request to ' + req.path);
    insertLogToCollectoin(req.path, req.user?.userId, res.data);
  });
  next();
}

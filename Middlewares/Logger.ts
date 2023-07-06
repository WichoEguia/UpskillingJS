import { Request, Response, NextFunction } from "express";
import insertLogToCollectoin from "../Utils/Logger";

export function logToDB(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    res.on('finish', () => {
        console.log('Finished request to ' + req.path);        
        insertLogToCollectoin<any>(req.path, req.user?.userId, res.data);
    });
    next();
  }
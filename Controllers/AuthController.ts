import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

const TOP_SECRET_FIRM = 'SuperSecretFirm';

export class AuthController {
    public login(req: Request, res: Response) {
        const { userId, role }: UserDto = req.body;
        const token = jwt.sign({ userId, role }, 
            TOP_SECRET_FIRM, 
            { expiresIn: '1h' });
        res.json({ token, expiresIn: '1h' });
    };
}
import { Request, Response } from "express";
import { UserService } from "../Services/UserService";

export class UsersController {
    private userService = new UserService(); // Should use DI

    public async getUsers(req: Request, res: Response) {
        try {
            const usersData = await this.userService.getUsers();
            res.json(usersData);    
        } catch(error) {
            res.json({ error });
        }
    };
}
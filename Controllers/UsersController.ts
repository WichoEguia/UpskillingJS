import { Request, Response } from "express";
import { UserService } from "../Services/UserService";

export class UsersController {
    private userService = new UserService(); // Should use DI

    public async getUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getUsers();
            res.json(users);    
        } catch(error) {
            res.status(500).json({ error });
        }
    };

    public async getUserPosts(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const posts = await this.userService.getUserPost(userId);
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}
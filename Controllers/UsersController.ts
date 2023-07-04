import { Request, Response } from "express";
import { UserService } from "../Services/UserService";
import { UsersDataResponseDto } from "../Dto/UsersDataResponseDto";
import { UserPostsResponseDto } from "../Dto/UserPostsResponseDto";
import { BaseResponse } from "../Utils/BaseResponse";

export class UsersController {
    private userService = new UserService(); // Should use DI

    public async getUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getUsers();
            res.json(new BaseResponse<UsersDataResponseDto>(users));
        } catch(error) {
            res.status(500).json({ error });
        }
    };

    public async getUserPosts(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const posts = await this.userService.getUserPost(userId);
            res.json(new BaseResponse<UserPostsResponseDto>(posts));
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}
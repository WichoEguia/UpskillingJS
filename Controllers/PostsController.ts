import { Request, Response } from "express";
import { PostService } from "../Services/PostService";
import { BaseResponse } from "../Utils/BaseResponse";
import { SearchPostDto } from "../Dto/SearchPostResponseDto";

export class PostsController {
    private postService = new PostService(); // Should use DI

    public async searchPost(req: Request, res: Response) {
        try {
            const searchTerm = req.query.search;
            if (!searchTerm) {
                res.json({
                    msg: "Missing search term",
                    post: null
                });
            }
            const post = await this.postService.searchTerm(searchTerm as string);
            res.json(new BaseResponse<SearchPostDto>(post));
        } catch (error) {
            res.status(500).json({ error })
        }
    }
}
import { Request, Response } from 'express';
import { PostService } from '../Services/PostService';

export class PostsController {
  private postService = new PostService(); // Should use DI

  public async searchPost(req: Request, res: Response) {
    try {
      const searchTerm = req.query.search;
      if (!searchTerm) {
        res.json({
          response: {
            msg: 'Missing search term',
            post: null,
          },
        });
      }
      const post = await this.postService.searchTerm(searchTerm as string);
      res.data = JSON.stringify(post); // I don't like this solution :(
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}

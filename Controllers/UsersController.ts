import { Request, Response } from 'express';
import { UserService } from '../Services/UserService';

export class UsersController {
  private userService = new UserService(); // Should use DI

  public async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getUsers();
      res.data = users; // I don't like this solution :(
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

  public async getUserPosts(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const posts = await this.userService.getUserPost(userId);
      res.data = posts; // I don't like this solution :(
      res.json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}

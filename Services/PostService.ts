import { SearchPostDto } from '../Dto/SearchPostResponseDto';
import { request } from '../Utils/RequestUtils';

export class PostService {
  private searchInStr(text: string, term: string): boolean {
    return text.toLowerCase().split(' ').includes(term.toLowerCase());
  }

  public async searchTerm(term: string): Promise<SearchPostDto> {
    const postsData = await request<Post[]>('/posts');
    const post = postsData?.find((p) => {
      return this.searchInStr(p.title, term) || this.searchInStr(p.body, term);
    });

    if (!post) {
      return {
        msg: `No post found for that term: ${term}`,
        post: null,
      };
    }

    const { email } = (await request<User>(`/users/${post.userId}`)) as User;
    return {
      msg: null,
      post: {
        postId: post?.id,
        body: post?.body,
        email: email,
      },
    };
  }
}

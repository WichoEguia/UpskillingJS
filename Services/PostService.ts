import { SearchPostDto } from '../Dto/SearchPostResponseDto';
import { mapSearchPostResponse } from '../Utils/MappingUtils';
import { getPosts, getUserById } from '../Utils/RequestUtils';

export class PostService {
  private searchInStr(text: string, term: string): boolean {
    return text.toLowerCase().split(' ').includes(term.toLowerCase());
  }

  public async searchTerm(term: string): Promise<SearchPostDto> {
    const posts = await getPosts();
    const post = posts?.find((p) => {
      return this.searchInStr(p.title, term) || this.searchInStr(p.body, term);
    });

    if (!post) {
      return {
        msg: `No post found for that term: ${term}`,
        post: null,
      };
    }

    const { email } = await getUserById(post.userId);
    return mapSearchPostResponse(post, email);
  }
}

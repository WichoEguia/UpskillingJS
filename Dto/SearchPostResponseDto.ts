interface PostResponseDto {
  postId: number;
  body: string;
  email: string;
}

export interface SearchPostDto {
  msg: string | null;
  post: PostResponseDto | null;
}

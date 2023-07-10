interface PostResponseDto {
  postId: number;
  body: string;
  email: string;
}

export interface SearchPostDto {
  response: {
    msg: string | null;
    post: PostResponseDto | null;
  };
}

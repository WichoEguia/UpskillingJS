interface PostResponseDto {
  userId: number;
  name: string;
  email: string;
  postId: number;
  title: string;
  body: string;
}

export type UserPostsResponseDto = {
  response: PostResponseDto[];
};

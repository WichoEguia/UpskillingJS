interface PostResponseDto {
  userId: string;
  name: string;
  email: string;
  postId: string;
  title: string;
  body: string;
}

export type UserPostsResponseDto = PostResponseDto[];

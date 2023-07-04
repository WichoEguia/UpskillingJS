interface PostResponseDto {
    postId: string;
    body: string;
    email: string;
}

export interface SearchPostDto {
    msg: string | null,
    post: PostResponseDto | null;
}
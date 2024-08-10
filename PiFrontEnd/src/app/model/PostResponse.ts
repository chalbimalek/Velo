import { Post } from "./Post";

export interface PostResponse {
    likedByAuthUser: boolean;
    post: Post;
}

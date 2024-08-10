import { User } from "./User";

export interface Post {
	id: number;
	content: string;
	postPhoto: string;
	likeCount: number;
	commentCount: number;
	shareCount: number;
	dateCreated: string;
	dateLastModified: string;
	isTypeShare: boolean;
	author: User;
	sharedPost: Post;
}
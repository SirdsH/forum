import { User } from '../../users/schema/users.model';
export declare class Post {
    title: string;
    content: string;
    author: User;
    createdAt: Date;
}

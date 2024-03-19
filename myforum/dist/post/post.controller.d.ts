import { PostService } from './post.service';
import { Posts } from './schema/post.model';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    createPost(post: Posts): Promise<Posts>;
    getPosts(): Promise<Posts[]>;
    getPostById(id: string): Promise<Posts>;
}

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../users/schema/users.model';
import { Posts } from './schema/post.schema';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    createPost(createPostDto: CreatePostDto, author: User): Promise<Posts>;
    getPost(id: string): Promise<Posts>;
    getAllPosts(): Promise<Posts[]>;
    deletePost(id: string): Promise<Posts>;
    updatePost(id: string, updatePostDto: CreatePostDto): Promise<Posts>;
    getPostsByUser(id: string): Promise<Posts[]>;
}

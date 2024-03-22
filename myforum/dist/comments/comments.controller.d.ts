import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDocument } from './schema/comments.schema';
import { CommentService } from './comments.service';
import { PostService } from '../post/post.service';
export declare class CommentController {
    private commentService;
    private postService;
    constructor(commentService: CommentService, postService: PostService);
    createComment(postId: string, createCommentDto: CreateCommentDto): Promise<CommentDocument>;
    private findPostById;
    deleteComment(postId: string, commentId: string): Promise<void>;
    getCommentsByPostIdHandler(postId: string): Promise<CommentDocument[]>;
}

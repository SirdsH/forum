/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostDocument } from '../post/schema/post.schema';
import { CommentDocument } from './schema/comments.schema';
import { UserDocument } from '../users/schema/users.model';
export declare class CommentService {
    private commentModel;
    private postModel;
    private userModel;
    constructor(commentModel: Model<CommentDocument>, postModel: Model<PostDocument>, userModel: Model<UserDocument>);
    createComment(post: PostDocument, createCommentDto: CreateCommentDto): Promise<CommentDocument>;
    getCommentsByPostId(postId: string): Promise<CommentDocument[]>;
    deleteComment(postId: string, commentId: string): Promise<CommentDocument>;
}

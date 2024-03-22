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
import { CreatePostDto } from './dto/create-post.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schema/users.model';
import { PostDocument } from './schema/post.schema';
export declare class PostService {
    private postModel;
    private userModel;
    constructor(postModel: Model<PostDocument>, userModel: Model<UserDocument>);
    createPost(createPostDto: CreatePostDto, user: User): Promise<import("mongoose").Document<unknown, {}, PostDocument> & import("./schema/post.schema").Posts & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getPost(id: string): Promise<import("mongoose").Document<unknown, {}, PostDocument> & import("./schema/post.schema").Posts & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllPosts(): Promise<Omit<import("mongoose").Document<unknown, {}, PostDocument> & import("./schema/post.schema").Posts & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    deletePost(id: string): Promise<import("mongoose").Document<unknown, {}, PostDocument> & import("./schema/post.schema").Posts & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updatePost(id: string, updatePostDto: CreatePostDto): Promise<import("mongoose").Document<unknown, {}, PostDocument> & import("./schema/post.schema").Posts & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getPostsByUser(userId: string): Promise<Omit<import("mongoose").Document<unknown, {}, PostDocument> & import("./schema/post.schema").Posts & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
}

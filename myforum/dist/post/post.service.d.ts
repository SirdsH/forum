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
import { PostDocument } from './schema/post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class PostService {
    private postModel;
    private jwtService;
    private usersService;
    constructor(postModel: Model<PostDocument>, jwtService: JwtService, usersService: UsersService);
    createPost(createPostDto: CreatePostDto, token: string): Promise<import("mongoose").Document<unknown, {}, PostDocument> & import("./schema/post.model").Posts & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    getPosts(): Promise<(import("mongoose").Document<unknown, {}, PostDocument> & import("./schema/post.model").Posts & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<PostDocument>;
    remove(id: string): Promise<PostDocument>;
    updatePost(post: any): Promise<PostDocument>;
}

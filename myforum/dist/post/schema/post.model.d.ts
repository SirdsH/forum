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
import { Document } from 'mongoose';
import { User } from '../../users/schema/users.model';
import * as mongoose from 'mongoose';
export type PostDocument = Posts & Document;
export declare class Posts {
    title: string;
    content: string;
    author: mongoose.Types.ObjectId;
    createdAt: Date;
    likes: User[];
    comments: User[];
}
export declare const PostSchema: mongoose.Schema<Posts, mongoose.Model<Posts, any, any, any, Document<unknown, any, Posts> & Posts & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Posts, Document<unknown, {}, mongoose.FlatRecord<Posts>> & mongoose.FlatRecord<Posts> & {
    _id: mongoose.Types.ObjectId;
}>;

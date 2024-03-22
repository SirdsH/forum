import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserDocument } from '../../users/schema/users.model';
import { CommentDocument } from '../../comments/schema/comments.schema';

export type PostDocument = Posts & Document;

@Schema()
export class Posts {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: UserDocument;

  @Prop([{ type: Types.ObjectId, ref: 'Comment' }])
  comments: CommentDocument[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Posts);

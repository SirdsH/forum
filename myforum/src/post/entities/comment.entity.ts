import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schema/users.model';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  content: string;

  @Prop({ type: 'ObjectId', ref: 'User' })
  author: User;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

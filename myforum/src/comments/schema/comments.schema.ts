import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: any;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

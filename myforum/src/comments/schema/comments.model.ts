import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Post } from '../../post/entities/post.entity';
import { User } from '../../users/schema/users.model';

export type CommentDocument = Comments & Document;

@Schema()
export class Comments {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop()
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'Post' })
  postId: Post;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comments);

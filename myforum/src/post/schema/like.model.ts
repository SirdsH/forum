import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schema/users.model';
import { Post } from './post.model';

export type LikeDocument = Like & Document;

@Schema()
export class Like {
  @Prop({ type: 'ObjectId', ref: 'User' })
  user: User;

  @Prop({ type: 'ObjectId', ref: 'Post' })
  post: Post;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const LikeSchema = SchemaFactory.createForClass(Like);

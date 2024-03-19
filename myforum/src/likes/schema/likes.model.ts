import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Post } from '../../post/entities/post.entity';
import { User } from '../../users/schema/users.model';

export type LikeDocument = Likes & Document;

@Schema()
export class Likes {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ type: Types.ObjectId, ref: 'Post' })
  postId: Post;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const LikeSchema = SchemaFactory.createForClass(Likes);

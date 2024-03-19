import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schema/users.model';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: 'ObjectId', ref: 'User' })
  author: User;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop([{ type: 'ObjectId', ref: 'User' }])
  likes: User[];

  @Prop([{ type: 'ObjectId', ref: 'Comment' }])
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

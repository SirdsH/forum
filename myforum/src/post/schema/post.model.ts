import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schema/users.model';
import * as mongoose from 'mongoose';

export type PostDocument = Posts & Document;

@Schema()
export class Posts {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: 'ObjectId', ref: 'User' })
  author: mongoose.Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop([{ type: 'ObjectId', ref: 'User' }])
  likes: User[];

  @Prop([{ type: 'ObjectId', ref: 'User' }])
  comments: User[];
}

export const PostSchema = SchemaFactory.createForClass(Posts);

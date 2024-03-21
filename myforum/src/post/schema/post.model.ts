import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Types } from 'mongoose';
export type PostDocument = Posts & Document;

@Schema()
export class Posts {
  @Prop({ type: MongooseSchema.Types.String, required: true, ref: 'User' })
  userId: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Posts);

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentsModule } from './comments/comments.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://SirdsH:Svatapata6158@htforum.atjcy8i.mongodb.net/?retryWrites=true&w=majority',
    ),
    UsersModule,
    AuthModule,
    PostModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

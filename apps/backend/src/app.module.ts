import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      // validationSchema: Joi.object({
      //   JWT_SECRET: Joi.string().required(),
      //   JWT_EXPIRATION_TIME: Joi.string().required(),
      // }),
    }),
    NotesModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as process from 'process';

import { UsersModule } from './features/users.module';

dotenv.config();
export const db_username = process.env.DB_USERNAME;
export const db_password = process.env.DB_PASSWORD;
export const db_name = process.env.DB_NAME;
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: db_username,
      password: db_password,
      database: db_name,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

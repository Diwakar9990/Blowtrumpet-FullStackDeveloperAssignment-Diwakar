// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { CampaignsModule } from './campaigns/campaigns.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Loads env vars globally
    MongooseModule.forRoot(process.env.DB_URI!),
    AuthModule,
    UsersModule,
    CampaignsModule,
  ],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { ApplicationController } from './application.controller';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [AuthModule, UsersModule, DbModule, ApplicationModule],
  controllers: [AuthController, ApplicationController],
})
export class AppModule {}

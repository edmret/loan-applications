import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [AuthModule, UsersModule, DbModule, ApplicationModule],
})
export class AppModule {}

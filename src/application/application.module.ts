import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { DbModule } from 'src/db/db.module';
import { ApplicationController } from './application.controller';

@Module({
  imports: [DbModule],
  providers: [ApplicationService],
  exports: [ApplicationService],
  controllers: [ApplicationController],
})
export class ApplicationModule {}

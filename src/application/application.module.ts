import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModule {}

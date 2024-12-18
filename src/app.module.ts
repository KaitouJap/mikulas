import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChildrenModule } from './children/children.module';

@Module({
  imports: [ChildrenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

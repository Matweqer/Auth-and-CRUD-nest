import { Module } from '@nestjs/common';
import { AuthModule, PostsModule } from './modules';

@Module({
  imports: [AuthModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

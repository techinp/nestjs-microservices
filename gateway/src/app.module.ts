import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule, UserModule } from './module';
import { GlobalClientModule } from './client.module';

@Module({
  imports: [GlobalClientModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

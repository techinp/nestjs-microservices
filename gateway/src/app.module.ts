import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './module';
import { GlobalClientModule } from './client.module';

@Module({
  imports: [GlobalClientModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

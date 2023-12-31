import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule, OrderModule, ProductModule, UserModule } from './module';
import { GlobalClientModule } from './client.module';
import { APP_GUARD } from '@nestjs/core';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Module({
  imports: [
    GlobalClientModule,
    AuthModule,
    UserModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LocalAuthGuard,
    },
  ],
})
export class AppModule {}

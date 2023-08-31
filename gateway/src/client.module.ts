import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
      {
        name: 'USER',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class GlobalClientModule {}

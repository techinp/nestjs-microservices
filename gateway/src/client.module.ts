import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        // options: {
        // port: 3001,
        // },
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:3001'],
          },
          consumer: {
            groupId: 'auth-consumer',
          },
        },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        // options: { port: 3002 },
        options: {
          client: {
            clientId: 'user',
            brokers: ['localhost:3002'],
          },
          consumer: {
            groupId: 'user-consumer',
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class GlobalClientModule {}

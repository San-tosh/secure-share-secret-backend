import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot(),
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT as unknown as number,
        username: process.env.REDIS_USERNAME, // new property
        password: process.env.REDIS_PASSWORD, // new property
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

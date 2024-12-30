import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 5000, // Cache expiration time in milliseconds
      max: 10, // Maximum number of items in cache
      isGlobal: true,
      store: redisStore,
      host: '172.17.0.2',
      port: 6379,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

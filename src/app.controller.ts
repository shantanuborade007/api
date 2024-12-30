import { Controller, Get, Inject, Req, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('/email-notifications')
  async getHello(): Promise<any> {
    const key: string = 'email';
    const value = await this.cacheManager.get<string>(key);
    if (value) {
      console.log('cache hit !');
      return value;
    }
    const newValue = await this.appService.getHello();
    await this.cacheManager.set(key, newValue, 600000); // Cache expiration time in milliseconds
    return newValue;
  }

  @Get('get-cache')
  async getCache() {
    const key: string = 'email';
    const value = await this.cacheManager.get<string>(key);
    return value;
  }

  @Post('trigger')
  async getResponse(@Req() req: Request) {
    const payload = JSON.stringify(req.body);
    return payload;
  }
}

import { Controller, Get, Inject, Req, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  hello() {
    return 'hello dear';
  }

  @Get('/email-notifications')
  async getHello(): Promise<any> {
    const newValue = await this.appService.getHello();
    return newValue;
  }

  // @Get('get-cache')
  // async getCache() {
  //   const key: string = 'email';
  //   const value = await this.cacheManager.get<string>(key);
  //   return value;
  // }

  @Post('trigger')
  async getResponse(@Req() req: Request) {
    const payload = JSON.stringify(req.body);
    console.dir(payload, { depth: null });
    return payload;
  }
}

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async getHello(): Promise<any> {
    // Fetch from HTTP if not in cache
    const response = await firstValueFrom(
      this.httpService.get(
        'http://localhost:8080/email-notifications/api-docs-json',
      ),
    );

    return response.data;
  }
}

import { CACHE_MANAGER, HttpException, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

export class IsTokenValidationService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  public async isTokenValid(token: string) {
    const tokenFound = (await this.cacheService.get(token)) as any;
    if (tokenFound) return true;
    throw new HttpException('Token expired or not found.',400);
  }
}

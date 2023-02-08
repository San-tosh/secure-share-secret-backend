import { HttpException } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

export class IsTokenValidationService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  public async isTokenValid(token: string) {
    const tokenFound = await this.redis.get(token);
    if (tokenFound) return true;
    throw new HttpException('Token expired or not found.', 400);
  }
}

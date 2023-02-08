import { SaveEncryptionRepositoryInterface } from 'src/core/domain/repository/saveEncryptionRepositoryInterface';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

export class SaveEncryptionRepository
  implements SaveEncryptionRepositoryInterface
{
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async save(
    encryptedContent: string,
    token: string,
    ttl: number,
    hash: string,
  ) {
    this.redis.set(token, hash + ',' + encryptedContent, 'EX', ttl);
  }
}

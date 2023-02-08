import { SaveEncryptionRepositoryInterface } from 'src/core/domain/repository/saveEncryptionRepositoryInterface';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

export class SaveEncryptionRepository
  implements SaveEncryptionRepositoryInterface
{
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  async save(
    encryptedContent: string,
    token: string,
    ttl: number,
    hash: string,
  ) {
    return await this.cacheService.set(token, hash + ',' + encryptedContent, {
      ttl: ttl,
    });
  }
}

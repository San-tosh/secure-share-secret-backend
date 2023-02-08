import { HttpException } from '@nestjs/common';
import { DecryptionRepositoryInterface } from 'src/core/domain/repository/decryptionRepositoryInterface';
import { createDecipheriv } from 'crypto';
import { scrypt } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

export class DecryptionRepository implements DecryptionRepositoryInterface {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async decrypt(passphrase: string, token: string) {
    const key = (await promisify(scrypt)(passphrase, 'salt', 32)) as Buffer;
    const encryptedContent = (await this.redis.get(token)) as any;
    if (!encryptedContent) {
      throw new HttpException('Token Expired', 400);
    }
    const splitString = encryptedContent.split(',');
    const hashphrase = splitString[0];
    const isMatch = await bcrypt.compare(passphrase, hashphrase);
    if (!isMatch) {
      throw new HttpException('Incorret passphrase', 400);
    }
    const encryptedText = splitString[1];
    if (!encryptedText) {
      throw new HttpException('Token Expired', 400);
    }
    const decipher = createDecipheriv(
      'aes-256-ctr',
      key,
      Buffer.from(token, 'hex'),
    );
    const decryptedText = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, 'hex')),
      decipher.final(),
    ]);
    try {
      const a = this.redis.del(token);
      console.log('key', a);
    } catch (e) {
      console.log(e);
    }
    return decryptedText.toString();
  }
}

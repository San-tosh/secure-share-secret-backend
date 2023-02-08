import { GenerateLinkDTO } from '../dto/request/generateLink.dto';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { TYPES } from '../constants/types';
import { Inject } from '@nestjs/common';
import { SaveEncryptionRepositoryInterface } from 'src/core/domain/repository/saveEncryptionRepositoryInterface';
import * as bcrypt from 'bcrypt';
export class GenerateLinkService {
  constructor(
    @Inject(TYPES.repository.SaveEncryptionRepositoryInterface)
    private repo: SaveEncryptionRepositoryInterface,
  ) {}

  public async generateLink(dto: GenerateLinkDTO) {
    const iv = randomBytes(16);
    const key = (await promisify(scrypt)(dto.passphrase, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encryptedText = Buffer.concat([
      cipher.update(dto.content.trim()),
      cipher.final(),
    ]);
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(dto.passphrase, saltOrRounds);

    await this.repo.save(
      encryptedText.toString('hex'),
      iv.toString('hex'),
      dto.expiredAt,
      hash,
    );
    return { token: iv.toString('hex') };
  }
}

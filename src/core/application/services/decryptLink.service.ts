import { TYPES } from '../constants/types';
import { Inject } from '@nestjs/common';
import { DecryptionRepositoryInterface } from 'src/core/domain/repository/decryptionRepositoryInterface';
import { DecryptLinkDTO } from '../dto/request/decryptLink.dto';

export class DecryptLinkService {
  constructor(
    @Inject(TYPES.repository.DecryptRepositoryInterface)
    private repo: DecryptionRepositoryInterface,
  ) {}

  public async decrypt(dto: DecryptLinkDTO) {
    return await this.repo.decrypt(dto.passphrase, dto.token);
  }
}

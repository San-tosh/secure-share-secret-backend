import { Module } from '@nestjs/common';
import { GenerateLinkService } from './application/services/generateLink.service';
import { GenerateLinkController } from 'app/controllers/core/generateLink.controller';
import { TYPES } from './application/constants/types';
import { SaveEncryptionRepository } from './infrastructure/persistence/repository/saveEncryptionRepository';
import { DecryptionRepository } from './infrastructure/persistence/repository/decryptionRepository';
import { DecryptLinkController } from 'app/controllers/core/decryptLink.controller';
import { DecryptLinkService } from './application/services/decryptLink.service';
import { IsTokenValidationService } from './application/services/isTokenValid.service';
import { IsTokenValidController } from './../../app/controllers/core/isTokenValid.controller';

const DependenciesConstants = [
  {
    provide: TYPES.repository.SaveEncryptionRepositoryInterface,
    useClass: SaveEncryptionRepository,
  },
  {
    provide: TYPES.repository.DecryptRepositoryInterface,
    useClass: DecryptionRepository,
  },
];

@Module({
  imports: [],
  controllers: [
    GenerateLinkController,
    DecryptLinkController,
    IsTokenValidController,
  ],
  providers: [
    DecryptLinkService,
    GenerateLinkService,
    IsTokenValidationService,
    ...DependenciesConstants,
  ],
})
export class CoreModule {}

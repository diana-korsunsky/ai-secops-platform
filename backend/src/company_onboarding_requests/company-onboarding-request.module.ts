import { Module } from '@nestjs/common'
import { CompanyOnboardingRequest } from './company-onboarding-request.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
      imports: [
    TypeOrmModule.forFeature([CompanyOnboardingRequest]),
  ],
})
export class CompanyOnboardingRequestModule {}

    
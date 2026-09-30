import { Module } from '@nestjs/common'
import { CompanyOnboardingRequest } from './company-onboarding-request.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyOnboardingRequestsController } from './company_onboarding_requests.controller.js';
import { organizationOnboardingRequestService } from './organization-onboarding-request.service.js';

@Module({
      imports: [
    TypeOrmModule.forFeature([CompanyOnboardingRequest]),
  ],
  controllers: [CompanyOnboardingRequestsController],
  providers: [organizationOnboardingRequestService],
})
export class CompanyOnboardingRequestModule {}

    
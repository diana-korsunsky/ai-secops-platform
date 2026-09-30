import { Controller, Get } from '@nestjs/common';
import { organizationOnboardingRequestService } from './organization-onboarding-request.service.js';

@Controller()
export class CompanyOnboardingRequestsController {
  constructor(private readonly organizationOnboardingRequestService: organizationOnboardingRequestService) {}
}

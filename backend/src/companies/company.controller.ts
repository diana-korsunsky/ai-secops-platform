import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company.service.js';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
}

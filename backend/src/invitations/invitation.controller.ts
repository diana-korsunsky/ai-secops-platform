import { Controller, Get } from '@nestjs/common';
import { InvitationService } from './invitation.service.js';

@Controller()
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}
}

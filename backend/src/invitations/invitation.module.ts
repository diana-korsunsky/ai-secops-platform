import { Module } from '@nestjs/common'
import { Invitation } from './invitation.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationController } from './invitation.controller.js';
import { InvitationService } from './invitation.service.js';

@Module({
      imports: [
    TypeOrmModule.forFeature([Invitation]),
  ],
  controllers: [InvitationController],
  providers: [InvitationService],
})
export class InvitationModule {}



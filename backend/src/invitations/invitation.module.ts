import { Module } from '@nestjs/common'
import { Invitation } from './invitation.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
      imports: [
    TypeOrmModule.forFeature([Invitation]),
  ],
})
export class InvitationModule {}



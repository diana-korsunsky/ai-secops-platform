import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller.js'
import { AuthService } from './auth.service.js'
import { User } from '../users/user.entity.js'
import { TypeOrmModule } from '@nestjs/typeorm'



@Module({
    imports: [TypeOrmModule.forFeature([User])],

    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
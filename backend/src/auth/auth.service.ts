import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto.js';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';


@Injectable()
export class AuthService {

    constructor(@InjectRepository(User)private readonly userRepo: Repository<User>,) {}

    async login(data: LoginDto) {
        const user = await this.userRepo.findOne({where: { email: data.email },})
        
        if (!user || 
            !await argon2.verify( user.passwordHash, data.password)){
            throw new UnauthorizedException('Invalid email or password')
        }

     
        


    }
}

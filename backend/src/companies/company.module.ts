import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {Company} from './company.entity.js'
import { CompanyService } from './company.service.js'
import { CompanyController } from './company.controller.js'


@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],

})
export class CompanyModule {}
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { organization} from './organization.entity.js'


@Module({
  imports: [
    TypeOrmModule.forFeature([organization]),
  ],

})
export class OrganizationsModule {}
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

import { User } from '../users/user.entity.js'
import { Company } from '../companies/company.entity.js'
import { Invitation } from '../invitations/invitation.entity.js'
import { CompanyOnboardingRequest } from '../company_onboarding_requests/company-onboarding-request.entity.js'


dotenv.config({ path: '../.env' })

export const AppDataSource = new DataSource({
  type: 'postgres',

  host: 'localhost',
  port: Number(process.env.POSTGRES_PORT),

  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  entities: [Company, User, Invitation,CompanyOnboardingRequest],

  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
})
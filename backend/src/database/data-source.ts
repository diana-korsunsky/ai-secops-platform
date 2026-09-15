import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

import { Organization } from '../organizations/organization.entity.js'

dotenv.config({ path: '../.env' })

export const AppDataSource = new DataSource({
  type: 'postgres',

  host: 'localhost',
  port: Number(process.env.POSTGRES_PORT),

  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  entities: [Organization],
  migrations: ['src/database/migrations/*.ts'],

  synchronize: false,
})
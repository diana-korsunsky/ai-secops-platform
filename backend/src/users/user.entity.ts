import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  Check,
  CreateDateColumn,
} from 'typeorm'

import { Company } from '../companies/company.entity.js'
import { UserRole } from './user-role.enum.js'

@Entity('users')
@Check(`
  ("role" = 'SYSTEM_ADMIN' AND "companyId" IS NULL)
  OR
  ("role" <> 'SYSTEM_ADMIN' AND "companyId" IS NOT NULL)
`)
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 70})
  firstName: string

  @Column({ length: 70})
  lastName: string

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string

  @Column({ length: 255})
  passwordHash: string

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'companyId' })
  company: Company|null
}
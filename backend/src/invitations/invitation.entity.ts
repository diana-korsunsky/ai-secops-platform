import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Check,
} from 'typeorm'
import { UserRole } from '../users/user-role.enum.js'
import { Company } from '../companies/company.entity.js'

export enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
}

@Entity('invitations')
@Check(`
  ("role" = 'SYSTEM_ADMIN' AND "companyId" IS NULL)
  OR
  ("role" <> 'SYSTEM_ADMIN' AND "companyId" IS NOT NULL)
`)
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id: string
    
  @Column({ type: 'varchar', length: 255, unique: true })
  tokenHash: string

  @Column({ type: 'timestamptz' })
  expiresAt: Date

  @Column({ type: 'varchar', length: 255 })
  email: string

  @Column({ type: 'enum', enum: UserRole})
  role: UserRole

  @CreateDateColumn()
  createdAt: Date

  @Column({type: 'enum',enum: InvitationStatus,default: InvitationStatus.PENDING,})
  status: InvitationStatus

  @Column({ type: 'timestamptz', nullable: true })
  acceptedAt: Date | null

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'companyId' })
  company: Company|null
}
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum OnboardingRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity('company_onboarding_requests')
export class CompanyOnboardingRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({length: 70 })
  companyName: string

  @Column({ length: 70 })
  companyRegistrationNumber: string

  @Column({ length: 70 })
  contactName: string

  @Column({ type: 'varchar', length: 255})
  contactEmail: string

  @Column({type: 'varchar', length: 30, nullable: true })
  contactPhone: string  | null
  
  @Column({ type: 'enum', enum: OnboardingRequestStatus, default: OnboardingRequestStatus.PENDING })
  status: OnboardingRequestStatus

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ type: 'text', nullable: true })
  message: string | null
}
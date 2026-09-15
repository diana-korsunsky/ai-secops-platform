import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({length:70})
  name: string


  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date



}
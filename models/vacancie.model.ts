import { Entity, Column, ManyToOne } from 'typeorm'

import BaseModel, { IBase } from './base.model'
import User, { IUser } from './user.model'

export interface IVacancie extends IBase {
  dueDate: Date
  title: string
  description: string
  company: string
  presential: string
  companySize: string
  payment: string
  level: string
  formOfPayment: string
  comapnyDescription: string
  responsibilities: string
  requirements: string
  companyOffers: string
  user: IUser
}

@Entity()
export default class Vacancie extends BaseModel {

  @Column()
  dueDate: Date

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  company: string

  @Column()
  presential: string

  @Column()
  companySize: string

  @Column()
  payment: string

  @Column()
  level: string

  @Column()
  formOfPayment: string

  @Column()
  comapnyDescription: string

  @Column()
  responsibilities: string

  @Column()
  requirements: string

  @Column()
  companyOffers: string


  @ManyToOne(() => User, (user) => user.vacancies, {
    eager: true, //loads automatically
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User
}

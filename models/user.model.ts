import { Entity, Column, OneToMany } from 'typeorm'
import { MinLength, MaxLength } from 'class-validator'
import BaseModel, { IBase } from './base.model'
import Vacancie, { IVacancie } from "./vacancie.model";

export interface IUser extends IBase {
  name: string
  password?: string
  photo: string
  lastLoginDate: Date
  vacancies?: IVacancie[]
}

@Entity()
export default class User extends BaseModel {
  @MinLength(3, {
    message:
      '$property is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(20, {
    message:
      '$property is too long. Max length is $constraint1 characters, but actual is $value',
  })
  @Column({ unique: true })
  name: string

  @Column({ select: false })
  password: string

  @Column({ default: 'default' })
  photo: string

  @Column()
  lastLoginDate: Date

  @OneToMany(() => Vacancie, (vacancie) => vacancie.user)
  vacancies: Vacancie[]
}

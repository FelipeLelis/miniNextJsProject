import { getRepository } from 'typeorm'
import { ApolloError } from 'apollo-server-express'
import vacancie, { IVacancie } from '../models/vacancie.model'
import { IContext, IBaseQuery } from '../types'
import { authorizeUser } from '../lib/auth'

/* Queries */

const listVacancie = async (
  _parent: any,
  { id }: { id: string },
  { authorization }: IContext,
) => {
  try {
    const user = await authorizeUser(authorization)
    const vacancieRepo = getRepository(vacancie)
    return await vacancieRepo.findOne({ where: { id, user } })
  } catch (err : any) {
    throw new ApolloError(err)
  }
}

const vacancies = async (
  _parent: any,
  { limit = 100, page = 1 }: IBaseQuery,
  { authorization }: IContext,
) => {
  try {
    const user = await authorizeUser(authorization)
    const vacancieRepo = getRepository(vacancie)
    const [payload, totalCount] = await vacancieRepo.findAndCount({
      where: { user },
      order: {
        dueDate: 'DESC',
      },
    })

    const pageCount = Math.ceil(totalCount / limit)
    const count = payload.length

    return {
      payload,
      totalCount,
      count,
      page,
      pageCount,
    }
  } catch (err : any) {
    throw new ApolloError(err)
  }
}

/* Mutations */

const createVacancie = async (
  _parent: any,
  { dueDate,
    title,
    description,
    company,
    presential,
    companySize,
    payment,
    level,
    formOfPayment,
    comapnyDescription,
    responsibilities,
    requirements,
    companyOffers
  }: IVacancie,
  { authorization }: IContext,
) => {
  try {
    const user = await authorizeUser(authorization)
    const vacanciesRepo = getRepository(vacancie)
    const creatingVacancie = await vacanciesRepo.create()
    creatingVacancie.dueDate = dueDate
    creatingVacancie.title = title
    creatingVacancie.description = description
    creatingVacancie.company = company
    creatingVacancie.presential = presential
    creatingVacancie.companySize = companySize
    creatingVacancie.payment = payment
    creatingVacancie.level = level
    creatingVacancie.formOfPayment = formOfPayment
    creatingVacancie.comapnyDescription = comapnyDescription
    creatingVacancie.responsibilities = responsibilities
    creatingVacancie.requirements = requirements
    creatingVacancie.companyOffers = companyOffers
    creatingVacancie.user = user
    return await vacanciesRepo.save(creatingVacancie)
  } catch (err : any) {
    throw new ApolloError(err)
  }
}

const updateVacancie = async (
  _parent: any,
  { id,
    dueDate,
    title,
    description,
    company,
    presential,
    companySize,
    payment,
    level,
    formOfPayment,
    comapnyDescription,
    responsibilities,
    requirements,
    companyOffers
  }: IVacancie,
  { authorization }: IContext,
) => {
  try {
    await authorizeUser(authorization)
    const vacancieRepo = getRepository(vacancie)
    const vacancieFindOne = await vacancieRepo.findOne({ where: { id } })

    if (!vacancieFindOne) {
      throw new ApolloError('Vacancie does not exist')
    }

    vacancieFindOne.dueDate = dueDate || vacancieFindOne.dueDate
    vacancieFindOne.description = description || vacancieFindOne.description
    vacancieFindOne.title = title || vacancieFindOne.title
    vacancieFindOne.company = company || vacancieFindOne.company
    vacancieFindOne.presential = presential || vacancieFindOne.presential
    vacancieFindOne.companySize = companySize || vacancieFindOne.companySize
    vacancieFindOne.payment = payment || vacancieFindOne.payment
    vacancieFindOne.level = level || vacancieFindOne.level
    vacancieFindOne.formOfPayment = formOfPayment || vacancieFindOne.formOfPayment
    vacancieFindOne.comapnyDescription = comapnyDescription || vacancieFindOne.comapnyDescription
    vacancieFindOne.responsibilities = responsibilities || vacancieFindOne.responsibilities
    vacancieFindOne.requirements = requirements || vacancieFindOne.requirements
    vacancieFindOne.companyOffers = companyOffers || vacancieFindOne.companyOffers

    return await vacancieRepo.save(vacancieFindOne)
  } catch (err : any) {
    throw new ApolloError(err)
  }
}

const removeVacancie = async (
  _parent: any,
  { id }: { id: string },
  { authorization }: IContext,
) => {
  try {
    const user = await authorizeUser(authorization)
    const vacancieRepo = getRepository(vacancie)
    const vacancieFindOne = await vacancieRepo.findOne({ where: { id, user } })

    if (!vacancieFindOne) {
      throw new ApolloError('Vacancie does not exist')
    }

    return await vacancieRepo.remove(vacancieFindOne)
  } catch (err : any) {
    throw new ApolloError(err)
  }
}

/* Resolver */

const VacancieResolver = {
  Query: {
    listVacancie,
    vacancies,
  },
  Mutation: {
    createVacancie,
    updateVacancie,
    removeVacancie,
  },
}

export default VacancieResolver

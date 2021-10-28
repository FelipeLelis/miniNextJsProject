import { gql } from 'apollo-server-express'
import userSchema from './user.schema'
import vacancieSchema from './vacancies.schema'

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`

export default [linkSchema, userSchema, vacancieSchema]

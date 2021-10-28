import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        listVacancie(id: ID!): Vacancie
        vacancies(limit: Int, page: Int): VacancieResult
    }

    extend type Mutation {
        createVacancie(
            dueDate: Date!, 
            title: String!, 
            description: String!,
            company: String!,
            presential: String!,
            companySize: String!,
            payment: String!,
            level: String!,
            formOfPayment: String!,
            comapnyDescription: String!,
            responsibilities: String!,
            requirements: String!,
            companyOffers: String!
        ): Vacancie
        updateVacancie(
            id: ID!
            dueDate: Date
            title: String
            description: String
            company: String!
            presential: String!
            companySize: String!
            payment: String!
            level: String!
            formOfPayment: String!
            comapnyDescription: String!
            responsibilities: String!
            requirements: String!
            companyOffers: String!
        ): Vacancie
        removeVacancie(id: ID!): Vacancie
    }

    type Vacancie {
        id: ID!
        createdDate: Date!
        updatedDate: Date!
        dueDate: Date!
        title: String!
        description: String!
        company: String!
        presential: String!
        companySize: String!
        payment: String!
        level: String!
        formOfPayment: String!
        comapnyDescription: String!
        responsibilities: String!
        requirements: String!
        companyOffers: String!
    }

    type VacancieResult {
        payload: [Vacancie]
        totalCount: Int
        count: Int
        page: Int
        pageCount: Int
    }
    
`

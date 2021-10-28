import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Router from "next/router";
import { UserStats } from "../../components/Users";
import { TodoList } from "../../components/Todos";
import { Form, SubmitButton, StyledInput } from "../../components/FormElements";
import { IUser } from "../../models/user.model";

const addTimezoneOffset = (dateString: string) => {
  const date = new Date(dateString);
  const timeOffsetInMS = date.getTimezoneOffset() * 60000;
  const dateWithOffset = date.setTime(date.getTime() + timeOffsetInMS);
  return new Date(dateWithOffset);
};

export const GET_USER = gql`
    query GetUser {
        user {
            id
            name
            createdDate
        }
    }
`;

export const CREATE_VACANCY = gql`
    mutation createVacancie(
        $title: String!,
        $description: String!,
        $dueDate: Date!
        $company: String!
        $presential: String!
        $companySize: String!
        $payment: String!
        $level: String!
        $formOfPayment: String!
        $comapnyDescription: String!
        $responsibilities: String!
        $requirements: String!
        $companyOffers: String!
    ) {
        createVacancie(
            title: $title,
            description: $description,
            dueDate: $dueDate,
            company: $company,
            presential: $presential,
            companySize: $companySize,
            payment: $payment,
            level: $level,
            formOfPayment: $formOfPayment,
            comapnyDescription: $comapnyDescription,
            responsibilities: $responsibilities,
            requirements: $requirements,
            companyOffers: $companyOffers,
        ) {
            id
            title
            description
            company
            presential
            companySize
            payment
            level
            formOfPayment
            comapnyDescription
            responsibilities
            requirements
            companyOffers
        }
    }
`;

export const GET_VACANCIES = gql`
    query vacancies($limit: Int) {
        vacancies(limit: $limit) {
            totalCount
            payload {
                id
                title
                description
                dueDate
                company
                presential
                companySize
                payment
                level
                formOfPayment
                comapnyDescription
                responsibilities
                requirements
                companyOffers
            }
        }
    }
`;

const All = ({ user }: { user: IUser }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [company, setCompany] = useState("");
  const [presential, setPresential] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [payment, setPayment] = useState("");
  const [level, setLevel] = useState("");
  const [formOfPayment, setFormOfPayment] = useState("");
  const [comapnyDescription, setComapnyDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");
  const [companyOffers, setCompanyOffers] = useState("");
  const [createVacancie] = useMutation(CREATE_VACANCY);
  const { loading, data } = useQuery(GET_VACANCIES, {
    variables: { limit: 100 }
  });

  const handleCreateVacancy = () => {
    createVacancie({
      variables: {
        title,
        description,
        dueDate: addTimezoneOffset(dueDate),
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
      },
      refetchQueries: [
        {
          query: GET_VACANCIES,
          variables: { limit: 100 }
        }
      ]
    }).then(() => {
      setTitle("");
      setDescription("");
      setDueDate("");
      setCompany("");
      setPresential("");
      setCompanySize("");
      setPayment("");
      setLevel("");
      setFormOfPayment("");
      setComapnyDescription("");
      setResponsibilities("");
      setRequirements("");
      setCompanyOffers("");
    });
  };

  const handleTitleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleCompanyUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(e.target.value);
  };

  const handlePresentialUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPresential(e.target.value);
  };

  const handleCompanysizeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanySize(e.target.value);
  };
  const handleDetPaymentUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayment(e.target.value);
  };
  const handleDetLevelUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(e.target.value);
  };
  const handleDetFormOfPaymentUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormOfPayment(e.target.value);
  };
  const handleSetComapnyDescriptionUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComapnyDescription(e.target.value);
  };
  const handleDetResponsibilitiesUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResponsibilities(e.target.value);
  };
  const handleSetRequirementsUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequirements(e.target.value);
  };
  const handleSetCompanyOffersUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyOffers(e.target.value);
  };

  const handleDueDateUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    addTimezoneOffset(e.target.value);
    setDueDate(e.target.value);
  };

  if (loading) return <pre>Loading...</pre>;

  return (
    <>
      <div className="row">
        <div className="col-sm-2">
          <UserStats
            name={user.name}
            createdDate={String(user.createdDate)}
            todoCount={data.vacancies.totalCount}
          />
        </div>
        <div className="col-sm-1" />
        <div className="col-sm-3">
          <TodoList payload={data.vacancies.payload} />
        </div>
        <div className="col-sm-3">
          <Form title={"Create Vacancy"} onSubmit={handleCreateVacancy}>
            <StyledInput
              type="date"
              name="dueDate"
              placeholder="Date"
              value={dueDate}
              onChange={handleDueDateUpdate}
            />
            <StyledInput
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={handleTitleUpdate}
            />
            <StyledInput
              type="text"
              name="description"
              placeholder="Description"
              value={description}
              onChange={handleDescriptionUpdate}
            />
            <StyledInput
              type="text"
              name="company"
              placeholder="Company Name"
              value={company}
              onChange={handleCompanyUpdate}
            />
            <StyledInput
              type="text"
              name="presential"
              placeholder="Presential?"
              value={presential}
              onChange={handlePresentialUpdate}
            />
            <StyledInput
              type="text"
              name="companySize"
              placeholder="Company Size?"
              value={companySize}
              onChange={handleCompanysizeUpdate}
            />
            <StyledInput
              type="text"
              name="Payment"
              placeholder="Payment"
              value={payment}
              onChange={handleDetPaymentUpdate}
            />
            <StyledInput
              type="text"
              name="level"
              placeholder="Level?"
              value={level}
              onChange={handleDetLevelUpdate}
            />
            <StyledInput
              type="text"
              name="formOfPayment"
              placeholder="Form Of Payment?"
              value={formOfPayment}
              onChange={handleDetFormOfPaymentUpdate}
            />
            <StyledInput
              type="text"
              name="comapnyDescription"
              placeholder="Company Description"
              value={comapnyDescription}
              onChange={handleSetComapnyDescriptionUpdate}
            />
            <StyledInput
              type="text"
              name="responsibilities"
              placeholder="Responsibilities"
              value={responsibilities}
              onChange={handleDetResponsibilitiesUpdate}
            />
            <StyledInput
              type="text"
              name="requirements"
              placeholder="Requirements"
              value={requirements}
              onChange={handleSetRequirementsUpdate}
            />
            <StyledInput
              type="text"
              name="companyOffers"
              placeholder="Company Offers"
              value={companyOffers}
              onChange={handleSetCompanyOffersUpdate}
            />
            <SubmitButton text={"Create Vacancy"} />
          </Form>
        </div>
      </div>
    </>
  );
};

All.getInitialProps = async (context: any) => {
  try {
    const { data } = await context.apolloClient.query({ query: GET_USER });
    return data || {};
  } catch (err) {
    const { res } = context;
    if (res) {
      res.writeHead(302, { Location: "/" });
      res.end();
    } else {
      Router.replace("/");
    }
  }
};

export default All;

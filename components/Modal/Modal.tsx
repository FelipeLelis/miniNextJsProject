import styled from "@emotion/styled";
import { Form, StyledInput } from "../FormElements";
import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { GET_VACANCIES } from "../../pages/todos/list";


const addTimezoneOffset = (dateString: string) => {
  const date = new Date(dateString);
  const timeOffsetInMS = date.getTimezoneOffset() * 60000;
  const dateWithOffset = date.setTime(date.getTime() + timeOffsetInMS);
  return new Date(dateWithOffset);
};
const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  background: linear-gradient(57.99deg, #114b5f 0%, #1a936f 100%);
  color: #fcfcfc;
  margin-top: 20%;
  width: 90%;
  padding: 24px;
  border-radius: 2px;
`;

const Overlay = styled.div`
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Button = styled.button`
  text-align: center;
  background: #114b5f;
  width: 100%;
  font-family: 'Poppins Light';
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #fcfcfc;
  border: none;
  height: 40px;
  border-radius: 2px;

  &:hover {
    background: #205060;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;

export const UPDATE_VACANCIE = gql`
    mutation updateVacancie(
        $id: ID!
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
        updateVacancie(
            id: $id,
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

interface ModalProps {
  id: string;
  _title: string;
  _description: string;
  hideModal: any;
  visible: any;
  _dueDate: string;
  _company: string;
  _presential: string;
  _companySize: string;
  _payment: string;
  _level: string;
  _formOfPayment: string;
  _comapnyDescription: string;
  _responsibilities: string;
  _requirements: string;
  _companyOffers: string;
}

const Modal = ({
                 id,
                 _title,
                 _description,
                 hideModal,
                 visible,
                 _dueDate,
                 _company,
                 _presential,
                 _companySize,
                 _payment,
                 _level,
                 _formOfPayment,
                 _comapnyDescription,
                 _responsibilities,
                 _requirements,
                 _companyOffers
               }: ModalProps) => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState(Date)
  const [company, setCompany] = useState("")
  const [presential, setPresential] = useState("")
  const [companySize, setCompanySize] = useState("")
  const [payment, setPayment] = useState("")
  const [level, setLevel] = useState("")
  const [formOfPayment, setFormOfPayment] = useState("")
  const [comapnyDescription, setComapnyDescription] = useState("")
  const [responsibilities, setResponsibilities] = useState("")
  const [requirements, setRequirements] = useState("")
  const [companyOffers, setCompanyOffers] = useState("")
  const [_updateVacancie] = useMutation(UPDATE_VACANCIE);

  const handleUpdateVacancies = () => {
    _updateVacancie({
      variables: {
        id,
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
    });
  };
  return (
    <Overlay style={visible}>
      <Dialog>
        <div className="row">
          <Form title={"Update Vacancy"} onSubmit={handleUpdateVacancies}>
            <div className="col-sm-3">
              <StyledInput
                type="text"
                name="title"
                placeholder={_title}
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <StyledInput
                type="date"
                name="dueDate"
                placeholder={_dueDate}
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
              />
              <StyledInput
                type="text"
                name="description"
                placeholder={_description}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <StyledInput
                type="text"
                name="company"
                placeholder={_company}
                value={company}
                onChange={e => setCompany(e.target.value)}
              />
              <StyledInput
                type="text"
                name="presential"
                placeholder={_presential}
                value={presential}
                onChange={e => setPresential(e.target.value)}

              />
              <StyledInput
                type="text"
                name="companySize"
                placeholder={_companySize}
                value={companySize}
                onChange={e => setCompanySize(e.target.value)}
              />
              <StyledInput
                type="text"
                name="payment"
                placeholder={_payment}
                value={payment}
                onChange={e => setPayment(e.target.value)}
              />
              <StyledInput
                type="text"
                name="level"
                placeholder={_level}
                value={level}
                onChange={e => setLevel(e.target.value)}
              />
              <StyledInput
                type="text"
                name="formOfPayment"
                placeholder={_formOfPayment}
                value={formOfPayment}
                onChange={e => setFormOfPayment(e.target.value)}
              />
              <StyledInput
                type="text"
                name="comapnyDescription"
                placeholder={_comapnyDescription}
                value={comapnyDescription}
                onChange={e => setComapnyDescription(e.target.value)}
              />
              <StyledInput
                type="text"
                name="responsibilities"
                placeholder={_responsibilities}
                value={responsibilities}
                onChange={e => setResponsibilities(e.target.value)}
              />
              <StyledInput
                type="text"
                name="requirements"
                placeholder={_requirements}
                value={requirements}
                onChange={e => setRequirements(e.target.value)}
              />
              <StyledInput
                type="text"
                name="companyOffers"
                placeholder={_companyOffers}
                value={companyOffers}
                onChange={e => setCompanyOffers(e.target.value)}
              />
            </div>
            <Wrapper>
              <Button onClick={hideModal}>Cancel </Button>
              <Button >Confirm </Button>
            </Wrapper>
          </Form>

        </div>

      </Dialog>
    </Overlay>
  );
};

export default Modal;

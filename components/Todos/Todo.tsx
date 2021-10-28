import React, { useState } from "react";
import styled from "@emotion/styled";
import { Modal } from "../Modal";

//const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone

interface IVacancieProps {
  id: string;
  onClick: (id: string) => void;
  title: string;
  description: string;
  dueDate: string;
  company: string;
  presential: string;
  companySize: string;
  payment: string;
  level: string;
  formOfPayment: string;
  comapnyDescription: string;
  responsibilities: string;
  requirements: string;
  companyOffers: string;
}
const Todo = ({
                id,
                title,
                description,
                dueDate,
                company,
                presential,
                companySize,
                payment,
                level,
                formOfPayment,
                comapnyDescription,
                responsibilities,
                requirements,
                companyOffers,
                // dueDate,
              }: IVacancieProps) => {
  const [visible, setVisiblity] = useState({display: 'none'})
  const showModal = () => {
    setVisiblity({display: 'block'})
  };

  const hideModal = () => {
    setVisiblity({display: 'none'})
  };
  return (
    <>
      <Card onClick={() => showModal()}>
        <Row>
          <Title title={title}>Title : {title}</Title>
          <Wrapper>
            <DateString>

            </DateString>
          </Wrapper>
        </Row>
        <Description>Description : {description}</Description>
      </Card>
        <Modal
          hideModal={hideModal}
          visible={visible}
          id={id}
          _title={title}
          _description={description}
          _dueDate={dueDate}
          _company={company}
          _presential={presential}
          _companySize={companySize}
          _payment={payment}
          _level={level}
          _formOfPayment={formOfPayment}
          _comapnyDescription={comapnyDescription}
          _responsibilities={responsibilities}
          _requirements={requirements}
          _companyOffers={companyOffers}
        />
    </>
  );
};

const Card = styled.button<{}>`
  display: flex;
  flex-wrap: wrap;
  color: #fcfcfc;
  padding: 16px;
  margin-bottom: 16px;
  background: #1a936f;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  border: 4px solid transparent;

  &:hover {
    background: #28a37e;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  min-width: 100%;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
`;

const Title = styled.p`
  font-family: 'Poppins SemiBold';
  font-weight: 600;
  font-size: 16px;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const DateString = styled.p`
  text-align: right;
  font-family: 'Poppins Light';
  font-weight: 500;
  font-size: 12px;
  line-height: 1;
  margin: 3px 0 0 8px;
  white-space: nowrap;
`;

const Description = styled.p`
  font-family: Poppins Light;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  text-align: left;
`;
export default Todo;

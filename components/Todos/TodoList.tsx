import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Dropdown, DropdownOption } from '../Dropdown'

import { IVacancie } from "../../models/vacancie.model";
import Todo from './Todo'

interface IVacanciesList {
  payload: IVacancie[]
}

const TodoList = ({ payload }: IVacanciesList) => {
  const [isVisible, setDropdownVisiblity] = useState(false)

  const handleClearCompleted = () => {
    setDropdownVisiblity(false)
  }

  const handleClick = (id: string) => {
    console.log(id);
  }

  return (
    <List>
      <Heading>
        <Title>Vacancies</Title>
        <Dropdown isVisible={isVisible}>
          <DropdownOption
            text={'Clear Completed'}
            onClick={handleClearCompleted}
          />
        </Dropdown>
      </Heading>
      <Scrollable>
        {payload.length ? (
          payload.map(
            ({
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
             }: IVacancie) => (
              <Todo
                key={id}
                id={id}
                onClick={handleClick}
                title={title}
                description={description}
                company={company}
                presential={presential}
                companySize={companySize}
                payment={payment}
                level={level}
                formOfPayment={formOfPayment}
                comapnyDescription={comapnyDescription}
                responsibilities={responsibilities}
                requirements={requirements}
                companyOffers={companyOffers}
                dueDate={String(dueDate)}
              />
            ),
          )
        ) : (
          <PlaceholderText>You've Got Nothing To Do!</PlaceholderText>
        )}
      </Scrollable>
    </List>
  )
}

const Title = styled.h1`
  font-family: 'Poppins Light';
  font-weight: 300;
  font-size: 36px;
  height: 36px;
  margin: 0;
  color: #fcfcfc;
`

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const Scrollable = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: visible;
  max-height: 700px;
  min-height: 700px;
`

const PlaceholderText = styled.p`
  font-family: 'Poppins Light';
  color: rgba(252, 252, 252, 0.5);
`

export default TodoList

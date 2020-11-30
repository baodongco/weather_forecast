import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Form, Spinner, Button } from 'react-bootstrap'
import useOuterClick from '../ultilities/use_outer_click'

const StyledSearchBoxContainer = styled(Container)`
  font-size: 1rem;
  display: flex;
  justify-content: center;
  .suggestion-div-container {
    position: relative;
    width: 20rem;
    .spinner-container {
      margin: 2rem;
    }
    @media screen and (max-width: 768px){
      width: 90%;
    }
  }
  .form-group {
    margin: 0;
  }
`

const StyledSuggestionUl = styled.ul`
  z-index: 1;
  width: 100%;
  background: white;
  position: absolute;
  margin: 0 auto;
  padding: 0;
  max-height: 390px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
`

const StyledSuggestionLi = styled.li`
  color: black;
  width: 100%;
  list-style: none;
  z-index: 1;
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5);
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    background: blue;
    color: white;
  }
`

const StyledSpinner = styled(Spinner)`
  margin: 2rem;
`

const StyledButton = styled(Button)`
  background-color: initial!important;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  span {
    color: black;
  }
`

const SearchBox = ({ citiesList, clickItem, getCityList, showSuggestion, cityListLoading, weatherListLoading }) => {
  const [city, setCity] = useState('')
  const [ownSuggestionShow, setOwnSuggestionShow] = useState(true)

  const innerRef = useOuterClick(event => {
    if (showSuggestion) {
      setOwnSuggestionShow(false)
    }
  })

  useEffect(() => {
    if (showSuggestion) {
      setOwnSuggestionShow(true)
    }
  }, [showSuggestion, citiesList])

  return (
    <StyledSearchBoxContainer>
      <div className="suggestion-div-container" ref={innerRef}>
        <Form onSubmit={e => e.preventDefault()}>
          <Form.Group controlId="formSearchCity">

            <Form.Control autoComplete="off" type="text" placeholder="Search city..." value={city} onChange={e => {
              setCity(e.target.value)
              const value = e.target.value.trim()
              if (value) {
                getCityList(value) 
              }
            }}>
            </Form.Control>
            {cityListLoading ? <StyledButton disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </StyledButton> : ''}
          </Form.Group>
        </Form>
        {weatherListLoading ? <div className="spinner-container"><Spinner as={'span'} animation="border" role="status">
            </Spinner></div> : ''}
        {
          showSuggestion && ownSuggestionShow ? <StyledSuggestionUl>
            {
              citiesList ? citiesList.map((cityInList, index) => (<StyledSuggestionLi key={index} onClick={e => {
                setCity(cityInList.title)
                clickItem(cityInList)
              }
              }>{cityInList.title}</StyledSuggestionLi>)) : ''
            }
          </StyledSuggestionUl>
            : ''
        }
      </div>
    </StyledSearchBoxContainer>
  )
}

export default SearchBox

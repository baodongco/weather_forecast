import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, Container, CardGroup } from 'react-bootstrap'
import styled from 'styled-components'

const StyledCardGroups = styled(CardGroup)`
  margin-top: 3rem;
  color: black;
  display: flex;
  flex-flow: row wrap;
  justify-content: center
`

const StyledCards = styled(Card)`
  min-width: 10rem;
  min-height: 20rem;
  margin: 1rem;
  padding: 1rem 0.5rem;
  border: 1px solid white;
  @media screen and (max-width: 768px){
    width: 90%;
  }
`

const StyledCardText = styled(Card.Text)`
  font-size: 1rem;
`

const StyledCardBody = styled(Card.Body)`
  padding: 0;
`

const WeatherCardGroup = ({ data }) => {
  return (
    <Container>
      <StyledCardGroups>
        {
          data && data.length > 0 ?
            data.map((dateWeather, index) => {
              return (
                <StyledCards key={index}>
                  <StyledCardBody>
                    <Card.Title>{`${moment(dateWeather.date).format('dddd')}`}</Card.Title>
                    <StyledCardText>{`Date: ${dateWeather.date}`}</StyledCardText>
                    <StyledCardText>{`Max temparate: ${Math.round(dateWeather.weather.max_temp)}`}</StyledCardText>
                    <StyledCardText>{`Min temparate: ${Math.round(dateWeather.weather.min_temp)}`}</StyledCardText>
                  </StyledCardBody>
                </StyledCards>
              )
            }) : ''
        }
      </StyledCardGroups>
    </Container>
  )
}

WeatherCardGroup.propTypes = {
  data: PropTypes.array,
}

export default WeatherCardGroup

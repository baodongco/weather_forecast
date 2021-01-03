import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import SearchBox from '../components/search_box'
import WeatherCardGroup from '../components/weather_card_group'
import styled from 'styled-components'
import Alert from 'react-bootstrap/Alert'
import { Container } from 'react-bootstrap'

const StyledAlert = styled(Alert)`
  font-size: 14px;
  width: 75%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  @media only screen and (max-width: 767px) {
    width: 90%;
  }
`

const Main = ({ weatherList, requestWeatherList, isWeatherListLoading, cityList, isCityListLoading, requestCityList, setCityInput, cityInput, setError, error }) => {
  const [city, setCity] = useState({})
  const [showSuggestion, setShowSuggestion] = useState(false)

  useEffect(() => {
    cityInput ? 
    requestCityList({ city: cityInput }) : ''
  }, [cityInput])

  useEffect(() => {
    setShowSuggestion(true)
  }, [cityList])

  useEffect(() => {
    city && city.woeid ? requestWeatherList({cityId: city.woeid}) : ''
  }, [city])

  const setInputDebounce = useCallback(debounce((city) => {
    setCityInput(city)
  }, 1000), [])

  return (
    <div>
      <SearchBox
        showSuggestion={showSuggestion}
        citiesList={cityList}
        clickItem={(city) => {
          setShowSuggestion(false)
          setCity(city)
        }}
        cityListLoading={isCityListLoading}
        weatherListLoading={isWeatherListLoading}
        getCityList={city => {
          setInputDebounce(city)
        }} />
      {error && (
        <Container>
          <StyledAlert variant="danger" onClose={() => setError()} dismissible>
            <b>{error}</b>
          </StyledAlert>
        </Container>
      )}
      <WeatherCardGroup
        data={weatherList}
      ></WeatherCardGroup>
    </div>
  )
}

Main.propTypes = {
  weatherList: PropTypes.array,
  requestWeatherList: PropTypes.func,
  isWeatherListLoading: PropTypes.bool,
  cityList: PropTypes.array,
  isCityListLoading: PropTypes.bool,
  requestCityList: PropTypes.func,
  setCityInput: PropTypes.func,
  cityInput: PropTypes.string,
  setError: PropTypes.func,
  error: PropTypes.string,
}

export default Main

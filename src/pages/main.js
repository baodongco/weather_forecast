import React, { useState, useCallback, useEffect } from 'react'
import debounce from 'lodash/debounce'
import SearchBox from '../components/search_box'
import WeatherCardGroup from '../components/weather_card_group'

const Main = ({ weatherList, requestWeatherList, isWeatherListLoading, cityList, isCityListLoading, requestCityList, setCityInput, cityInput }) => {
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
      <WeatherCardGroup
        data={weatherList}
      ></WeatherCardGroup>
    </div>
  )
}

export default Main

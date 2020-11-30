import React, { useState, useCallback } from 'react'
import debounce from 'lodash/debounce'
import { requests } from '../ultilities/requests'
import SearchBox from '../components/search_box'
import WeatherCardGroup from '../components/weather_card_group'
import { getDate } from '../ultilities/date'

const Main = () => {
  const [cityList, setCityList] = useState([])
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [datesWeather, setDatesWeather] = useState([])
  const [cityListLoading, setCityListLoading] = useState(false)
  const [weatherListLoading, setWeatherListLoading] = useState(false)

  let formattedCitiesList = []

  const clickItem = (item) => {
    setShowSuggestion(false)
    const dates = []
    for (let i = 0; i < 5; i++) {
      let newDate = new Date()
      newDate.setDate(newDate.getDate() + i)
      const date = getDate(newDate)
      dates.push(date)
    }
    setWeatherListLoading(true)
    getWeather(item, dates)
  }

  const getWeather = async (city, dates) => {
    const promises = []
    let formattedResults = []
    for (let i = 0; i < dates.length; i++) {
      promises.push(requests('get', `location/${city.woeid}/${dates[i]}`))
    }
    Promise.all(promises)
      .then(result => {
        for (let i = 0; i < result.length; i++) {
          formattedResults.push({
            date: dates[i],
            weather: result[i][0],
            index: i
          })
        }
        setDatesWeather(formattedResults)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setWeatherListLoading(false)
      })
  }

  const getCityList = useCallback(debounce(async (city) => {
    try {
      const citiesRequest = await requests('get', `location/search/?query=${city}`)
      formattedCitiesList = citiesRequest ? citiesRequest.map(city => ({
        title: city.title || '',
        woeid: city.woeid || ''
      })) : ''
      setCityList(formattedCitiesList)
      setShowSuggestion(true)
    } catch (err) {
      console.log(err)
    } finally {
      setCityListLoading(false)
    }
  }, 1000), [])

  return (
    <div>
      <SearchBox
        showSuggestion={showSuggestion}
        citiesList={cityList}
        clickItem={clickItem}
        cityListLoading={cityListLoading}
        weatherListLoading={weatherListLoading}
        getCityList={city => {
          setCityListLoading(true)
          getCityList(city)
        }} />
      <WeatherCardGroup
        data={datesWeather}
      ></WeatherCardGroup>
    </div>
  )
}

export default Main

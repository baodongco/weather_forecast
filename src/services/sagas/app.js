import { call, put, takeLatest, all } from 'redux-saga/effects'
import { REQUEST_CITY_LIST, REQUEST_WEATHER_LIST } from '../redux/app/actionTypes'
import { setCityList, setWeatherList } from '../redux/app/actions'
import { setError, setCityListLoading, setWeatherListLoading, unsetCityListLoading, unsetWeatherListLoading } from '../redux/app/actions'
import weatherApiCalls from '../apiCalls/weather'
import { getDate } from '../../ultilities/date'

function* getCityList({ payload }) {
  const { city } = payload

  try {
    yield put(setCityListLoading())
    const response = yield call(weatherApiCalls.getCity, city)
    const formattedCitiesList = response.map(city => ({
      title: city.title || '',
      woeid: city.woeid || ''
    }))

    yield put(setCityList(formattedCitiesList))
  } catch (error) {
    error.response && error.response && error.response.data ? yield put(setError(error.response.data)) : yield put(setError('Something went wrong! Please try again later!'))
  } finally {
    yield put(unsetCityListLoading())
  }
}

function* getWeathers({ payload }) {
  try {
    const { cityId } = payload
    yield put(setWeatherListLoading())
    yield put(setWeatherList([]))
    const weatherCalls = []
    const formattedResults = []
    const dates = []
    for (let i = 0; i < 5; i++) {
      let newDate = new Date()
      newDate.setDate(newDate.getDate() + i)
      const date = getDate(newDate)
      weatherCalls.push(call(weatherApiCalls.getWeathers, cityId, date))
      dates.push(date)
    }
    const response = yield all(weatherCalls)
    for (let i = 0; i < response.length; i++) {
      formattedResults.push({
        date: dates[i],
        weather: response[i][0],
        index: i
      })
    }

    yield put(setWeatherList(formattedResults))
  } catch (error) {
    error.response && error.response && error.response.data ? yield put(setError(error.response.data)) : yield put(setError('Something went wrong! Please try again later!'))
  } finally {
    yield put(unsetWeatherListLoading())
  }

}

const app = [
  takeLatest(REQUEST_CITY_LIST, getCityList),
  takeLatest(REQUEST_WEATHER_LIST, getWeathers)
]

export default app

import { SET_ERROR, SET_CITY_INPUT, SET_CITY_LIST_LOADING, SET_WEATHER_LIST_LOADING, SET_CITY_LIST, SET_WEATHER_LIST } from './actionTypes'

const initialState = {
  cityList: [],
  weatherList: [],
  isCityListLoading: false,
  isWeatherListLoading: false,
  error: '',
  cityInput: ''
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ERROR:
      return {
        ...state,
        error: payload,
      }
    case SET_CITY_INPUT:
      return {
        ...state,
        cityInput: payload
      }
    case SET_CITY_LIST_LOADING:
      return {
        ...state,
        isCityListLoading: payload,
      }
    case SET_WEATHER_LIST_LOADING:
      return {
        ...state,
        isWeatherListLoading: payload,
      }
    case SET_WEATHER_LIST:
      return {
        ...state,
        weatherList: payload,
      }
    case SET_CITY_LIST:
      return {
        ...state,
        cityList: payload,
      }
    default:
      return state
  }
}

export default reducer

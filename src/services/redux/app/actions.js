import { SET_ERROR, REQUEST_CITY_LIST, SET_CITY_INPUT, SET_CITY_LIST, SET_WEATHER_LIST_LOADING, REQUEST_WEATHER_LIST, SET_WEATHER_LIST, SET_CITY_LIST_LOADING } from './actionTypes'

export const requestCityList = payload => ({ type: REQUEST_CITY_LIST, payload })
export const setCityList = payload => ({ type: SET_CITY_LIST, payload })
export const requestWeatherList = payload => ({ type: REQUEST_WEATHER_LIST, payload })
export const setWeatherList = payload => ({ type: SET_WEATHER_LIST, payload })
export const setCityListLoading = () => ({ type: SET_CITY_LIST_LOADING, payload: true })
export const setWeatherListLoading = () => ({ type: SET_WEATHER_LIST_LOADING, payload: true })
export const unsetCityListLoading = () => ({ type: SET_CITY_LIST_LOADING, payload: false })
export const unsetWeatherListLoading = () => ({ type: SET_WEATHER_LIST_LOADING, payload: false })
export const setError = (payload = null) => ({ type: SET_ERROR, payload })
export const setCityInput = (payload = null) => ({ type: SET_CITY_INPUT, payload })

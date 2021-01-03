import { connect } from 'react-redux'
import { requestCityList, requestWeatherList, setCityInput, setError } from '../services/redux/app/actions'
import Main from './main'

const mapStateToProps = state => ({
  cityList: state.app.cityList,
  weatherList: state.app.weatherList,
  isCityListLoading: state.app.isCityListLoading,
  isWeatherListLoading: state.app.isWeatherListLoading,
  cityInput: state.app.cityInput,
  error: state.app.error,
})

const mapDispatchToProps = {
  requestCityList,
  requestWeatherList,
  setCityInput,
  setError,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

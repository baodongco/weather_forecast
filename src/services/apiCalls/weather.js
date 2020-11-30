import { requests } from '../../ultilities/requests'

const weather = {
  getCity: city => requests('get', `location/search/?query=${city}`),
  getWeathers: (cityId, date) => requests('get', `location/${cityId}/${date}`)
}

export default weather

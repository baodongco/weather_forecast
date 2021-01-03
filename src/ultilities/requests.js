import axios from 'axios'

export function requests(method, endpoint, body) {
  return axios({
    method,
    url: `${process.env.REACT_APP_BASE_URL || ''}${endpoint}`,
    data: { ...body }
  })
    .then(result => {
      return result.data
    })
    .catch(err => {
      throw err
    })
}

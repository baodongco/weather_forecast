import axios from 'axios'

export function requests(method, endpoint, body) {
  console.log('params: ', arguments)
  return axios({
    method,
    url: `${process.env.REACT_APP_BASE_URL || ''}${endpoint}`,
    data: { ...body }
  })
    .then(result => {
      console.log('result: ', result.data)
      return result.data
    })
    .catch(err => {
      throw err.response
    })
}

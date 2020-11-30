import { all } from 'redux-saga/effects'
import app from './app'

function* mainSaga() {
  yield all([...app])
}

export default mainSaga

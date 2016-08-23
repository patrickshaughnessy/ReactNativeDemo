import {take, call, put} from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'

export default (api) => {
  function * worker (symbol) {
    const response = yield call(api.quote, symbol)

    if (response.ok) {
      const results = response.data
      yield put(Actions.receiveQuote({ results }))
    } else {
      yield put(Actions.receiveQuoteFailure())
    }
  }

  function * watcher () {
    while (true) {
      const { symbol } = yield take(Types.QUOTE_REQUEST)
      console.log(symbol)
      yield call(worker, symbol)
    }
  }

  return {
    watcher,
    worker
  }
}

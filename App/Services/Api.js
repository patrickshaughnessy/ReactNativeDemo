// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import Reactotron from 'reactotron'

const create = (baseURL = 'http://dev.markitondemand.com/Api/v2') => {
  const api = apisauce.create({ baseURL })

  const addMonitor = api.addMonitor((response) => {
    Reactotron.apiLog(response)
  })

  const lookup = (input) => api.get(`/Lookup/json?input=${input}`)
  const quote = (symbol) => api.get(`/Quote/json?symbol=${symbol}`)

  return {
    lookup,
    quote,
    addMonitor
  }
}

export default {
  create
}

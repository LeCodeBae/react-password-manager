import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from '../reducers'

const middlewares = applyMiddleware(logger, thunk)

export default createStore(reducers, compose(
  middlewares,
  window.devToolsExtension ? window.devToolsExtension() : f => f
))
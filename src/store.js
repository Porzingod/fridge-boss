import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const middleware = applyMiddleware(thunk, logger)
const store = createStore(
  reducer,
  compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f)
)
export default store

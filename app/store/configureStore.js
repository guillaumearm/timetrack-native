import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  test: true
})

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk))
}

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-native-redux-router'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  test: true,
  routerReducer,
})

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk))
}

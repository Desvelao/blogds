import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
// import * as actions from './reducers/actioncreators'
import reducers from './reducers'

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store
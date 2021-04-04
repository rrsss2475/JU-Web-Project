import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { categoryListReducer } from './reducers/categoryReducers'
import { subcategoryListReducer } from './reducers/subcategoryReducers'

const reducer = combineReducers({
  categoryList: categoryListReducer,
  subcategoryList: subcategoryListReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;

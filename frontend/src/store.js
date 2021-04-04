import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { categoryListReducer } from './reducers/categoryReducers'
import { subcategoryListReducer } from './reducers/subcategoryReducers'
import { productListReducer } from './reducers/productReducers'

const reducer = combineReducers({
  categoryList: categoryListReducer,
  subcategoryList: subcategoryListReducer,
  productList: productListReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;

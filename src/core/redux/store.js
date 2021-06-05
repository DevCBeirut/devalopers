import { createStore,compose,applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import reducerlist from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk];


const store = createStore(reducerlist,  composeEnhancers(applyMiddleware(...middlewares))
);
export default store;
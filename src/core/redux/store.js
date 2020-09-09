import { createStore } from "redux";

import reducerlist from './reducers'

const store = createStore(reducerlist);
export default store;
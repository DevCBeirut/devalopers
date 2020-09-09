import { combineReducers } from 'redux'
import loadingReducer from './loadingReducer'
import showMsgReducer from './showMsgReducer'
import updateReducer from './updateReducer'
import redirectReducer from './redirectReducer'
import refreshReducers from './refreshReducers'
import msgcountReducer from './msgcountReducer'

export default combineReducers({
    progress : loadingReducer,
    showmsg : showMsgReducer,
    updateinfo:updateReducer,
    redirect:redirectReducer,
    refresh:refreshReducers,
    count:msgcountReducer
})
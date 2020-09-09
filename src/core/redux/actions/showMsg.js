import {SHOWMSG_MSG_SUCCESS,SHOWMSG_MSG_DANGER,SHOWMSG_RESET} from "../actionTypes"

const showMsgSuccess = (payload) => {
    return {
        type: SHOWMSG_MSG_SUCCESS,
        payload
    }
}
const showMsgDanger = (payload) => {
    return {
        type: SHOWMSG_MSG_DANGER,
        payload
    }
}

const resetMsg = (payload) => {
    return {
        type: SHOWMSG_RESET,
        payload
    }
}
export  {showMsgSuccess,showMsgDanger,resetMsg};



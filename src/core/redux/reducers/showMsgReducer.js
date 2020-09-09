import {SHOWMSG_MSG_SUCCESS,SHOWMSG_MSG_DANGER,SHOWMSG_RESET} from "../actionTypes"


const initalState ={
    msg:"",
    type:0 // 0 off / 1 success , 2 danger
}

export default function showMsgReducer(state = initalState, action) {
    switch (action.type) {
        case SHOWMSG_MSG_SUCCESS:
            return {...state, msg: action.payload,type:1};
        case SHOWMSG_MSG_DANGER:
            return {...state, msg: action.payload,type:2};
        case SHOWMSG_RESET:
            return {...state, msg: "",type:0};
        default:
            return state;
    }
}
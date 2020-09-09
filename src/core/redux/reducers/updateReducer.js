import {UPDATEINFO} from "../actionTypes"

const initalState ={
    updateinfo:false
}

export default function updateReducer(state = initalState, action) {
    switch (action.type) {
        case UPDATEINFO:
            return {...state, updateinfo: action.payload};
        default:
            return state;
    }
}
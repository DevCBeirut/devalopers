import {REFRESH} from "../actionTypes"

const initalState ={
    refresh:false
}

export default function refreshReducer(state = initalState, action) {
    switch (action.type) {
        case REFRESH:
            return {...state, refresh: action.payload};
        default:
            return state;
    }
}
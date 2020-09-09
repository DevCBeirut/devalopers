import {REDIRECT} from "../actionTypes"

const initalState ={
    location:""
}

export default function redirectReducer(state = initalState, action) {
    switch (action.type) {
        case REDIRECT:
            return {...state, location: action.payload};
        default:
            return state;
    }
}
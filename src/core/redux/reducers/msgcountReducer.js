import {UPDATEMSGCOUNT} from "../actionTypes"

const initalState ={
    count:0
}

export default function msgcountReducer(state = initalState, action) {
    switch (action.type) {
        case UPDATEMSGCOUNT:
            return {...state, count: action.payload};
        default:
            return state;
    }
}
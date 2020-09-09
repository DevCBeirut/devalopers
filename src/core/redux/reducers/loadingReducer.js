import {LOADING} from "../actionTypes"

const initalState ={
    loading:false
}

 export default function loadingReducer(state = initalState, action) {
     switch (action.type) {
         case LOADING:
             return {...state, loading: action.payload};
         default:
             return state;
     }
 }
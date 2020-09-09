import {REDIRECT} from "../actionTypes"

const redirectAction = (payload) => {
    return {
        type: REDIRECT,
        payload
    }
}
export default redirectAction;
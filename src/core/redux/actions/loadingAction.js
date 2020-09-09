import {LOADING} from "../actionTypes"

const loadingAction = (payload) => {
    return {
        type: LOADING,
        payload
    }
}
export default loadingAction;
import {REFRESH} from "../actionTypes"

const refreshAction = (payload) => {
    return {
        type: REFRESH,
        payload
    }
}
export default refreshAction;
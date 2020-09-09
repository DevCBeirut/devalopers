import {UPDATEINFO} from "../actionTypes"

const updateInfoAction = (payload) => {
    return {
        type: UPDATEINFO,
        payload
    }
}
export default updateInfoAction;
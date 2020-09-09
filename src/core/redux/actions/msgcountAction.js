import {UPDATEMSGCOUNT} from "../actionTypes"

const msgcountAction = (payload) => {
    return {
        type: UPDATEMSGCOUNT,
        payload
    }
}
export default msgcountAction;
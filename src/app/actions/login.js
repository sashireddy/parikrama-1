import {USER_LOGIN,LOG_OUT} from './types'
export const login = (userPayload)=> (dispatch)=>{
    dispatch({
        type:USER_LOGIN,
        payload:userPayload
    })
}
export const logout = () => (dispatch)=> {
    dispatch({
        type:LOG_OUT,
    })
}
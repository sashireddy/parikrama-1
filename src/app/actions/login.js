import {USER_LOGIN} from './types'
export const login = (userPayload)=> (dispatch)=>{
    dispatch({
        type:USER_LOGIN,
        payload:userPayload
    })
}
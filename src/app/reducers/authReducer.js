import {USER_LOGIN} from '../actions/types'
const token = localStorage.getItem('Token')
const expiryTime = localStorage.getItem('ExpiryTime')
let loggedIn = false
if(expiryTime > new Date() && token){
    loggedIn = true     
}
const initialState = {
    loggedIn,
    userInfo : {
        //adding dummy data to test, this info comes from The login page
        token : loggedIn ? token : undefined,
        userName : 'pari@pari.com'
    }
}
export default function(state = initialState, action){
    switch(action.type){
        case USER_LOGIN:
            return { 
                loggedIn: true,
                userInfo : {
                    ...state.userInfo,
                    userName:action.payload.email,
                    token: action.payload.token
                }
            } 
        default :
            return state
    }
}
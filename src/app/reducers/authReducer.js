import {USER_LOGIN} from '../actions/types'

const initialState = {
    loggedIn: false,
    userInfo : {
        //adding dummy data to test, this info comes from The login page
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
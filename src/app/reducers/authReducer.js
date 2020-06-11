import {USER_LOGIN} from '../actions/types'

const initialState = {
    loggedIn: false,
    userInfo : {

    }
}
export default function(state = initialState, action){
    switch(action.type){
        case USER_LOGIN:
            return { 
                loggedIn: true,
                userInfo : {
                    ...state.userInfo,
                    email:action.payload.email
                }
            } 
        //custom reducers apart from crud reducers need to go here
        default :
            return state
    }
}
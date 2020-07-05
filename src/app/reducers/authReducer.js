import {USER_LOGIN,LOG_OUT} from '../actions/types'
import firebase from '../Firebase/firebase'

const initialState = () => ({
    
    loggedIn: firebase.auth.currentUser!==null,
    userInfo : {
        userName : firebase.auth.currentUser && firebase.auth.currentUser.email
    }
})

export default function(state = initialState(), action){
    switch(action.type){
        case USER_LOGIN:
            return { 
                loggedIn: true,
                userInfo : {
                    ...state.userInfo,
                    userName:firebase.auth.currentUser && firebase.auth.currentUser.email,
                }
            } 
        case LOG_OUT:
            return {
                loggedIn: false,
                userInfo: {}
            }

        default :
            return state
    }
}
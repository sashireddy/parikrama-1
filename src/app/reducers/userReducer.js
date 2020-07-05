import crudReducers from './crudReducers'
import pageConstants from '../constants/pages'
import {GET_LOGGEDIN_USER} from '../actions/types'
import {initialState as stateTemplate} from "./crudReducers"

let initialState = {...stateTemplate}

const reducerFunc = crudReducers(pageConstants.pages.user);

export default function(state = initialState, action) {
    switch(action.type){
        case GET_LOGGEDIN_USER:
            return {
                ...state,
                initialLoad : true,
                loggedInUser: {
                    ...action.payload
                }
            }            
        default:
            return reducerFunc(state, action);
    }
}
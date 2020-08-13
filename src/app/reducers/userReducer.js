import crudReducers from './crudReducers'
import pageConstants from '../constants/pages'
import {GET_LOGGEDIN_USER, GET_ALL_USERS} from '../actions/types'
import {initialState as stateTemplate} from "./crudReducers"

let initialState = {...stateTemplate }
initialState['allRecords'] = [];

const reducerFunc = crudReducers(pageConstants.pages.user);

export default function(state = initialState, action) {
    switch(action.type){
        case GET_LOGGEDIN_USER: {
            return {
                ...state,
                loggedInUserLoad : true,
                loggedInUser: {
                    ...action.payload
                }
            }
        }
        case GET_ALL_USERS: {
            return {
                ...state,
                initialLoad : true,
                'allRecords': action.payload
            }
        }
        default:
            return reducerFunc(state, action);
    }
}
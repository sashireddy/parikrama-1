import crudReducers from './crudReducers'
import pageConstants from '../constants/pages'
import {GET_LOGGEDIN_USER} from '../actions/types'

const userCrudReducers =  crudReducers(pageConstants.pages.user)

const initialState = {
    data : [],
    allRecords : ['users1','user2','user3'],
    loggedInUser : {}
}
export default function(state = initialState, action){
    switch(action.type){
        //custom reducers apart from crud reducers need to go here

        case GET_LOGGEDIN_USER:
            return {
                ...state,
                loggedInUser: {
                    ...action.payload
                }
            }

        default:
            return userCrudReducers(state,action)
    }
}
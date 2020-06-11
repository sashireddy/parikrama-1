import crudReducers from './crudReducers'
import pageConstants from '../constants/pages'

const userCrudReducers =  crudReducers(pageConstants.pages.user)

const initialState = {
    data : [],
    allRecords : ['users1','user2','user3']
}
export default function(state = initialState, action){
    switch(action.type){
        //custom reducers apart from crud reducers need to go here
        default:
            return userCrudReducers(state,action)
    }
}
import {initialState} from './crudReducers'
import crudReducers from './crudReducers'
import pageConstants from '../constants/pages'
import { GET_PENDING_TRANSACTIONS} from  '../actions/types'
const categoryCrudReducers =  crudReducers(pageConstants.pages.inventory)
const inventoryInitialState = {
    ...initialState,
    search: {},
    pendingTransactions : [],
    pendingTransactionsLoading : false,
}
export default function(state = inventoryInitialState, action){
    switch(action.type){
        //custom reducers apart from crud reducers need to go here
        case GET_PENDING_TRANSACTIONS:
            return {
                ...state,
                loading : false,
                pendingTransactionsLoading : false,
                pendingTransactions : action.payload,
            }
        default:
            return categoryCrudReducers(state,action)
    }
}
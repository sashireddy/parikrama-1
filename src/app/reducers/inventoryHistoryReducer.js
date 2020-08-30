
import crudReducers from './crudReducers'
import pageConstants from '../constants/pages'
import { INVENTORY_LOADING, GET_INVENTORY_HISTORY } from  '../actions/types'
const categoryCrudReducers =  crudReducers(pageConstants.pages.inventoryHistory)

let initialState = {
    data: [],
    startDate: null,
    endDate: null,
    state: "ACCEPTED",
    branch: "",
    loading: false,
    nextPageToken: null,
    prevPageToken: null
};
export default function(state = initialState, action){
    switch(action.type){
        case INVENTORY_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_INVENTORY_HISTORY:
            return {
                ...state,
                ...action.payload,
                loading : false
            }
        default:
            return categoryCrudReducers(state,action)
    }
}
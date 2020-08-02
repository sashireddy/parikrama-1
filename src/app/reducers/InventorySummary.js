import {initialState as stateTemplate} from './crudReducers'
import {GET_INVENTORY_VIEW_SUMMARY,
    INVENTORY_VIEW_LOADING_ERROR,
    INVENTORY_VIEW_LOADING} from '../actions/types'
let initialState = {...stateTemplate, search: {}}


export default function(state = initialState, action) {
    switch(action.type){
        case INVENTORY_VIEW_LOADING:
            return {
                ...state,
                loading: true
            }

        case GET_INVENTORY_VIEW_SUMMARY:
            return {
                ...state,
                ...action.payload,
                loading: false
            }
        case INVENTORY_VIEW_LOADING_ERROR:
            return {
                ...state,
                loading : false
            }
        default:
            return state;
    }
}
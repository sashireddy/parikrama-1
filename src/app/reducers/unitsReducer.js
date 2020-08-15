import {GET_ALL_UNITS, GET_UNITS,UNITS_LOADING,} from '../actions/types'
import config from '../constants/config'

const initialState = {
    data: [],
    currentPage: 1,
    pageLimit: config.PAGINATION.PAGE_LIMIT,
    totalRecords: 0,
    search: {},
    sort: {},
    loading: false,
    flashMessage: {}
}
export default function(state = initialState, action){
    switch(action.type){
        case UNITS_LOADING :
            return {
                ...state,
                loading : true
            }
        case GET_ALL_UNITS:
            return {
                ...state,
                allRecords : action.payload,
                initialLoad : true,
                loading : false
            }
        case GET_UNITS:
                return {
                    ...state,
                    ...action.payload,
                    loading: false
                }
        case "UNITS_PAGELOAD_ERROR":
            return {
                ...state,
                loading : false
            }
        default:
            return state

    }
}
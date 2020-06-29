import {GET_ALL_UNITS , ADD_UNIT,GET_UNITS} from '../actions/types'
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
        case GET_ALL_UNITS:
            return {
                data : action.payload,
                loading : false
            }
        case ADD_UNIT:
            return {
                data : [...state.data , action.unit]
            }
        case GET_UNITS:
            console.log(GET_UNITS, action.payload);
                return {
                    ...state,
                    ...action.payload,
                    loading: false
                }
        default:
            return state

    }
}
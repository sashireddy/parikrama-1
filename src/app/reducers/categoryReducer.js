import config from "../constants/config";
import {CATEGORY_LOADING, GET_CATEGORIES} from "../actions/types";

const initialState = {
    data: [],
    currentPage: 1,
    pageLimit: config.PAGINATION.PAGE_LIMIT,
    totalRecords: 1,
    search: {},
    loading: false,
    flashMessage: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case CATEGORY_LOADING:
            return {
                ...state,
                loading: true
            }

        case GET_CATEGORIES:
            return {
                ...state,
                ...action.payload,
                loading: false
            }

        default:
            return state;
    }
}
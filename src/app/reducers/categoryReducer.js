import {CATEGORY_LOADING, GET_CATEGORIES, GET_CATEGORY} from '../actions/types';

const initialState = {
    selectedCategory: null,
    categories: null,
    loading: false
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
                categories: action.payload,
                loading: false
            }

        case GET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }

        default:
            return state;
    }
}
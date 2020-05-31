import config from "../constants/config";
import {CATEGORY_LOADING, GET_CATEGORIES, GET_CATEGORY, CATEGORY_PAGINATE} from "../actions/types";

const initialState = {
    selectedCategory: null,
    categories: [],
    currentCategories: [],
    currentPage: 1,
    pageLimit: config.PAGINATION.PAGE_LIMIT,
    totalRecords: 1,
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
            let categories = action.payload;
            let totalRecords = categories.length;
            let currentCategories =  getCurrentCategories(categories, state.currentPage, state.pageLimit)
            return {
                ...state,
                categories,
                currentCategories,
                totalRecords,
                loading: false
            }

        case GET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }

        case  CATEGORY_PAGINATE:
            return {
                ...state,
                currentPage: action.payload.currentPage,
                currentCategories: getCurrentCategories(state.categories, action.payload.currentPage, state.pageLimit)
            }

        default:
            return state;
    }
}

const getCurrentCategories = (categories, currentPage, pageLimit) => {
    const offset = (currentPage - 1) * pageLimit;
    return categories.slice(offset, offset + pageLimit);
}
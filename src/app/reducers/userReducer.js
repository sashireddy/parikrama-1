import config from "../constants/config";
import {GET_USERS,FILTER_USERS} from "../actions/types";

const initialState = {
    filteredUsers : [],
    currentUsers:[],
    users: [],
    currentPage: 1,
    pageLimit: config.PAGINATION.PAGE_LIMIT,
    totalRecords: 0,
    loading: true,
    nameFilter: ''
}

export default function(state = initialState, action){
    console.log('reducer user')
    switch(action.type){
        case GET_USERS:
            console.log('here',action)
            const userData = action.payload;
            const returnState = {
                ...state,
                users: userData,
                currentUsers:getCurrentCategories(userData,1,10),
                totalRecords: userData.length,
                loading :false
            }
            console.log(returnState)
            return returnState
        case FILTER_USERS:
            return {
                ...state,
                nameFilter : action.filter,
                filteredUsers : action.filteredUsers,
                currentUsers:getCurrentCategories(action.filteredUsers,1,10),

            }
        // case GET_CATEGORIES:
        //     let categories = action.payload;
        //     let totalRecords = categories.length;
        //     let currentCategories =  getCurrentCategories(categories, state.currentPage, state.pageLimit)
        //     return {
        //         ...state,
        //         categories,
        //         currentCategories,
        //         totalRecords,
        //         loading: false
        //     }

        // case GET_CATEGORY:
        //     return {
        //         ...state,
        //         category: action.payload
        //     }

        // case  CATEGORY_PAGINATE:
        //     return {
        //         ...state,
        //         currentPage: action.payload.currentPage,
        //         currentCategories: getCurrentCategories(state.categories, action.payload.currentPage, state.pageLimit)
        //     }

        default:
            return state;
    }
}

const getCurrentCategories = (categories, currentPage, pageLimit) => {
    const offset = (currentPage - 1) * pageLimit;
    return categories.slice(offset, offset + pageLimit);
}
import config from "../constants/config";
import {CATEGORY_LOADING, GET_CATEGORIES} from "../actions/types";

const initialState = {
    data: [],
    currentPage: 1,
    pageLimit: config.PAGINATION.PAGE_LIMIT,
    totalRecords: 1,
    search: {},
    sort: {
        key: "name",
        direction: "asc"
    },
    loading: false,
    flashMessage: {}
}
const reducer = (pageId) => {
    const getData = 'GET_'+pageId
    // const loadError = pageId+'_LOAD_ERROR'
    const loading = pageId+'_LOADING'
    return function(state = initialState, action){
        switch(action.type){
            case loading:
                return {
                    ...state,
                    loading: true
                }
    
            case getData:
                return {
                    ...state,
                    ...action.payload,
                    loading: false
                }
    
            default:
                return state;
        }
    }
}
// export default function(state = initialState, action){
//     switch(action.type){
//         case CATEGORY_LOADING:
//             return {
//                 ...state,
//                 loading: true
//             }

//         case GET_CATEGORIES:
//             return {
//                 ...state,
//                 ...action.payload,
//                 loading: false
//             }

//         default:
//             return state;
//     }
// }
export default reducer
import config from "../constants/config";

const initialState = {
    initialLoad : false,
    data: [],
    currentPage: 1,
    pageLimit: config.PAGINATION.PAGE_LIMIT,
    totalRecords: 0,
    search: { "isActive": "true" },
    sort: {},
    loading: false,
    flashMessage: {}
}
const reducer = (pageId) => {
    const getData = 'GET_'+pageId
    const loading = pageId+'_LOADING'
    const removeLoading = pageId+'_REMOVE_LOADING'
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
            case removeLoading:
                return{
                    ...state,
                    loading: false,
                }
            default:
                return state;
        }
    }
}
export {initialState}
export default reducer
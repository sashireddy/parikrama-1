

import {CATEGORY_LOADING, GET_CATEGORIES, CATEGORY_PAGINATE, CATEGORY_LOAD_ERROR} from './types';
import {getCategoriesData} from "../dataAbstraction/category";

// Get categories
export const getCategories = data => async dispatch => {
    dispatch(setCategoryLoading());
    try{
        const categories = await getCategoriesData(data);
        dispatch({
            type: GET_CATEGORIES,
            payload: categories
        });
    } catch(err){
        dispatch({
            type: CATEGORY_LOAD_ERROR,
            payload: {}
        });
    }
}

// Category loading
export const setCategoryLoading = () => {
    return {
        type: CATEGORY_LOADING
    }
}

export const paginate = params => {
    return {
        type: CATEGORY_PAGINATE,
        payload: params
    }
}
import axios from 'axios';

import {CATEGORY_LOADING, GET_CATEGORIES } from './types';

// Get categories
export const getCategories = () => async dispatch => {
    dispatch(setCategoryLoading());
    try{
        const res = await axios.get('/data/categories.json');
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        });
    } catch(err){
        dispatch({
            type: GET_CATEGORIES,
            payload: {}
        });
    }
}

// Profile loading
export const setCategoryLoading = () => {
    return {
        type: CATEGORY_LOADING
    }
}


import { GET_USERS,USERS_LOADING,} from './types';
import {getUserData} from "../dataAbstraction/user";

// Get categories
export const getUsers = data => async dispatch => {
    // dispatch(setUserLoadingAction());
    try{
        const users = await getUserData(data);
        // console.log('userData',users)
        dispatch({
            type: GET_USERS,
            payload:users 
        });
    } catch(err){
        // dispatch({
        //     type: CATEGORY_LOAD_ERROR,
        //     payload: {}
        // });
    }
}

// Category loading
export const setUserLoadingAction = () => {
    return {
        type: USERS_LOADING
    }
}

// export const paginate = params => {
//     return {
//         type: CATEGORY_PAGINATE,
//         payload: params
//     }
// }
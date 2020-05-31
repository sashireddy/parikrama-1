

import { GET_USERS,USERS_LOADING,FILTER_USERS} from './types';
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

export const filterUsers = (filter,users=[]) => async dispatch => {
    const filteredUsers = users.filter(user=>{
        return user.name.includes(filter)
    })
    console.log(filteredUsers)
    console.log('action')
    dispatch({
        type: FILTER_USERS,
        filter,
        filteredUsers
    })
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
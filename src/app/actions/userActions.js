

import { GET_USERS,USERS_LOADING,FILTER_USERS,GET_LOGGEDIN_USER} from './types';
import {getAllUsersData,getUserData} from "../dataAbstraction/user";

// Get categories
export const getUsers = data => async dispatch => {
    // dispatch(setUserLoadingAction());
    try{
        const users = await getAllUsersData(data);
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

export const getUserInfo = data => async dispatch => {
    try{
        const payload = await getUserData(data);
        console.log('userInfo Actinos alnavklcj dpsvnkclm djsakml')
        dispatch({
            type:GET_LOGGEDIN_USER ,
            payload
        })
    }catch(err){

    }
}

export const filterUsers = (filter,users=[]) => async dispatch => {
    const filteredUsers = users.filter(user=>{
        return user.name.includes(filter)
    })
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
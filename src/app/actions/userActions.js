import { getData, updateData, addData, deleteData, getUserData, loadInitialData } from '../dataAbstraction/user';
import skeletonActions from './crudActions';
import pageConstants from '../constants/pages';
import {GET_LOGGEDIN_USER, GET_ALL_USERS} from './types'
const actions = (()=>{
    const defaultSkeletonActions = skeletonActions(
        pageConstants.pages.user,
        getData,
        updateData,
        addData,
        deleteData
    );

    const getUserInfo = data => async dispatch => {
        try{
            const payload = await getUserData(data);
            dispatch({
                type:GET_LOGGEDIN_USER ,
                payload
            });
        }catch(err){

        }
    }

    const getAllUsers = () => async (dispatch) => {
        const allData = await loadInitialData();
          dispatch({
            type: GET_ALL_USERS,
            payload: allData,
          });
    }

    return {
        ...defaultSkeletonActions,
        getUserInfo,
        getAllUsers
    }
})()
export default actions
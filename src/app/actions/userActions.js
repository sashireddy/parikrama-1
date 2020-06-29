import { getData, updateData, addData, deleteData,getUserData } from '../dataAbstraction/user';
import skeletonActions from './crudActions';
import pageConstants from '../constants/pages';
import {GET_LOGGEDIN_USER} from './types'
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
            console.log('userInfo Actinos alnavklcj dpsvnkclm djsakml')
            dispatch({
                type:GET_LOGGEDIN_USER ,
                payload
            })
        }catch(err){
    
        }
    }

    return {
        ...defaultSkeletonActions,
        getUserInfo
    }
})()
export default actions
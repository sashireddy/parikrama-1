import { GET_ALL_ROLES } from './types';
import { getData, updateData, addData, deleteData, loadInitialData } from '../dataAbstraction/role';
import skeletonActions from './crudActions';
import pageConstants from '../constants/pages';

const actions = (()=>{
  const defaultSkeletonActions = skeletonActions(pageConstants.pages.role,
    getData, updateData, addData, deleteData);

    const getAllRoles = () =>  async (dispatch) => {
      const allData = await loadInitialData();
      dispatch({
        type: GET_ALL_ROLES,
        payload: allData,
      });
    }
  return {
    ...defaultSkeletonActions,
    getAllRoles
  }

})()
export default actions
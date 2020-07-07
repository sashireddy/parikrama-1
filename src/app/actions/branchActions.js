import { GET_ALL_BRANCHES } from './types';
import { getData, updateData, addData, deleteData, loadInitialData,refreshStateData } from '../dataAbstraction/branches'
import skeletonActions from './crudActions'
import pageConstants from '../constants/pages'

const actions = (()=>{
  const updateAllRecords = async (dispatch) => {
    const allData = refreshStateData();
    dispatch({
      type: GET_ALL_BRANCHES,
      payload: allData,
    });
  }
  const defaultSkeletonActions = skeletonActions(pageConstants.pages.branches,
    getData, updateData, addData, deleteData,updateAllRecords)
    const getAllBranches = () =>  async (dispatch) => {
      const allData = await loadInitialData();
      dispatch({
        type: GET_ALL_BRANCHES,
        payload: allData,
      });
    }
  return {
    ...defaultSkeletonActions,
    getAllBranches
    //other actions apart from the crud operations go here
  }

})()
export default actions
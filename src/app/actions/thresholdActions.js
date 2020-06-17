import {GET_ALL_THRESHOLD } from './types'
import { loadInitialData ,getData, updateData, addData, deleteData } from '../dataAbstraction/threshold'
import skeletonActions from './crudActions'
import pageConstants from '../constants/pages'

const actions = (()=>{
  const defaultSkeletonActions = skeletonActions(pageConstants.pages.threshold,
    getData, updateData, addData, deleteData)
    const getAllThreshold = () => async (dispatch) => {
        const allData = await loadInitialData();
          dispatch({
            type: GET_ALL_THRESHOLD,
            payload: allData,
          });
    }
  return {
    ...defaultSkeletonActions,
    // getAllCategories
    getAllThreshold
    //other actions apart from the crud operations go here
  }

})()
export default actions
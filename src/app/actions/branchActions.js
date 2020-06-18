// import { GET_ALL_CATEGORIES } from './types';
import { getData, updateData, addData, deleteData } from '../dataAbstraction/branches'
import skeletonActions from './crudActions'
import pageConstants from '../constants/pages'

const actions = (()=>{
  const defaultSkeletonActions = skeletonActions(pageConstants.pages.branches,
    getData, updateData, addData, deleteData)
    // const getAllCategories = () =>  async (dispatch) => {
    //   const allData = await loadInitialData();
    //   dispatch({
    //     type: GET_ALL_CATEGORIES,
    //     payload: allData,
    //   });
    // }
  return {
    ...defaultSkeletonActions,
    // getAllCategories
    //other actions apart from the crud operations go here
  }

})()
export default actions
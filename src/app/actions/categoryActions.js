import { GET_ALL_CATEGORIES } from './types';
import { getCategoriesData, updateCategoryData, addCategoryData, deleteCategoryData, loadInitialData,updateData } from '../dataAbstraction/category'
import skeletonActions from './crudActions'
import pageConstants from '../constants/pages'

const actions = (()=>{
  const updateAllRecords = async (dispatch) => {
    const allData = await updateData();
    dispatch({
      type: GET_ALL_CATEGORIES,
      payload: allData,
    });
  }
  const defaultSkeletonActions = skeletonActions(pageConstants.pages.category,
    getCategoriesData,updateCategoryData,addCategoryData,deleteCategoryData,updateAllRecords)
    const getAllCategories = () =>  async (dispatch) => {
      const allData = await loadInitialData();
      dispatch({
        type: GET_ALL_CATEGORIES,
        payload: allData,
      });
    }
  return {
    ...defaultSkeletonActions,
    getAllCategories
    //other actions apart from the crud operations go here
  }

})()
export default actions
// import { CATEGORY_LOADING, GET_CATEGORIES, CATEGORY_LOAD_ERROR } from './types'
import { getCategoriesData, updateCategoryData, addCategoryData, deleteCategoryData } from '../dataAbstraction/category'
import skeletonActions from './crudActions'
import pageConstants from '../constants/pages'

const actions = (()=>{
  const defaultSkeletonActions = skeletonActions(pageConstants.pages.category,
    getCategoriesData,updateCategoryData,addCategoryData,deleteCategoryData)
  return {
    ...defaultSkeletonActions,
    //other actions apart from the crud operations go here 
  }

})()
export default actions
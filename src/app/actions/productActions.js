import { GET_ALL_PRODUCTS } from './types';
import { getData, updateData, addData, deleteData, loadInitialData,refreshStateData} from '../dataAbstraction/products'
import skeletonActions from './crudActions'
import pageConstants from '../constants/pages'

const actions = (()=>{
  const updateAllRecords = async (dispatch) => {
    const allData =await refreshStateData();
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: allData,
    });
  }
  const defaultSkeletonActions = skeletonActions(pageConstants.pages.product,
    getData, updateData, addData, deleteData,updateAllRecords)
    const getAllProducts = () => async (dispatch) => {
        const allData = await loadInitialData();
          dispatch({
            type: GET_ALL_PRODUCTS,
            payload: allData,
          });
    }
  return {
    ...defaultSkeletonActions,
    getAllProducts
    // getAllCategories
    //other actions apart from the crud operations go here
  }

})()
export default actions
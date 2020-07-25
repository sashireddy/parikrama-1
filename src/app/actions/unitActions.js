
import {loadInitialData, addData, getData, updateData, deleteData} from '../dataAbstraction/unit'
import skeletonActions from './crudActions';
import pageConstants from '../constants/pages';
import { GET_ALL_UNITS } from './types';

const actions = (()=>{
    const defaultSkeletonActions = skeletonActions(
        pageConstants.pages.unit,
        getData,
        updateData,
        addData,
        deleteData
    );

    const getAllUnits = () =>  async (dispatch) => {
        const allData = await loadInitialData();
        dispatch({
          type: GET_ALL_UNITS,
          payload: allData,
        });
      }

    return {
        ...defaultSkeletonActions,
        getAllUnits
    }
})()
export default actions;
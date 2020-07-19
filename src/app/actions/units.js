import { addUnitData,loadInitialData,getPageData,refreshStateData} from '../dataAbstraction/unit'
import { GET_ALL_UNITS,GET_UNITS } from './types'

const actions = (()=>{
    const initialData = params => async dispatch => {
        const payload = await loadInitialData(params)
        dispatch({
            type: GET_ALL_UNITS,
            payload
        })
    }
    const updateAllRecords = async (dispatch) => {
      const allData =await refreshStateData();
      dispatch({
        type: GET_ALL_UNITS,
        payload: allData,
      });
    }
    const addData = params => async dispatch => {
      console.log(params)
      console.log('******************')
      const resp = await addUnitData(params)
        dispatch({
            type: GET_UNITS,
            payload : resp
        })
        updateAllRecords(dispatch)
    }
    const getData = params => async dispatch => {
        try {
            const UpdatedData = await getPageData(params);
            console.log(dispatch, "Action ", getData, UpdatedData);
            dispatch({
              type: GET_UNITS,
              payload: UpdatedData,
            });
          } catch (err) {
            dispatch({
              type: "UNITS_PAGELOAD_ERROR",
              payload: {},
            })
          }
    }
  return {
    initialData,
    addData,
    getData
  }

})()
export default actions
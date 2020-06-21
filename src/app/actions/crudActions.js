const actions = (pageId,getEntityData,updateEntityData,addEntityData,deleteEntityData) => {

  const getData = 'GET_'+pageId
  const loadError = pageId+'_LOAD_ERROR'
  const loading = pageId+'_LOADING'
  const setLoading = () => {
    return {
        type: loading,
      }
  }
  return {
    // get Entity unit data
    getData: (data) => async (dispatch) => {
      dispatch(setLoading())
      try {
        const UpdatedData = await getEntityData(data);
        console.log(dispatch, "Action ", getData, UpdatedData);
        dispatch({
          type: getData,
          payload: UpdatedData,
        });
      } catch (err) {
        dispatch({
          type: loadError,
          payload: {},
        })
      }
    },

    //loading operation
    setLoading,

    // Add Entity Unit
    addData: (data) => async (dispatch) => {
      dispatch(setLoading())
      try {
        const UpdatedData = await addEntityData(data)
        dispatch({
          type: getData,
          payload: UpdatedData,
        })
      } catch (err) {
        dispatch({
          type: loadError,
          payload: {},
        })
      }
    },

    // Update Entity Unit
    updateData: (data) => async (dispatch) => {
      dispatch(setLoading())
      try {
        const UpdatedData = await updateEntityData(data)
        dispatch({
          type: getData,
          payload: UpdatedData,
        })
      } catch (err) {
        dispatch({
          type: loadError,
          payload: {},
        })
      }
    },

    // delete Entity Unit
    deleteData: (data) => async (dispatch) => {
      dispatch(setLoading())
      try {
        const UpdatedData = await deleteEntityData(data)
        dispatch({
          type: getData,
          payload: UpdatedData,
        })
      } catch (err) {
        dispatch({
          type: loadError,
          payload: {},
        })
      }
    }
  }
}

export default actions
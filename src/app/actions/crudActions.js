import {addNotification} from "./notification";

const actions = (pageId,getEntityData,updateEntityData,addEntityData,deleteEntityData,updateData) => {

  const getData = 'GET_'+pageId;
  const loading = pageId+'_LOADING';
  const setLoading = () => {
    return {
        type: loading,
      }
  }

  const notifyStatus = (res) => {
    if(res.flashMessage){
      addNotification({
        title: getData,
        type: res.flashMessage.type,
        message : res.flashMessage.message
      });
    }
  }

  return {
    // get Entity unit data
    getData: (data) => async (dispatch) => {
      dispatch(setLoading());
      try {
        const res = await getEntityData(data);
        notifyStatus(res);
        dispatch({
          type: getData,
          payload: res,
        });
      } catch (err) {
        addNotification({
          title: getData,
          type: "danger",
          message : "Unable to load data, this is the error message"
        });
      }
    },

    //loading operation
    setLoading,

    // Add Entity Unit
    addData: (data) => async (dispatch) => {
      dispatch(setLoading());
      try {
        const res = await addEntityData(data);
        notifyStatus(res);
        dispatch({
          type: getData,
          payload: res,
        });
        if(updateData) { updateData(dispatch)}
      } catch (err) {
        addNotification({
          title: getData,
          type: "danger",
          message : "Unable to add data"
        });
      }
    },

    // Update Entity Unit
    updateData: (data) => async (dispatch) => {
      dispatch(setLoading());
      try {
        const res = await updateEntityData(data);
        notifyStatus(res);
        dispatch({
          type: getData,
          payload: res,
        });
        if(updateData) { updateData(dispatch)}
      } catch (err) {
        addNotification({
          title: getData,
          type: "danger",
          message : "Unable to update data"
        });
      }
    },

    // delete Entity Unit
    deleteData: (data) => async (dispatch) => {
      dispatch(setLoading());
      try {
        const res = await deleteEntityData(data)
        notifyStatus(res);
        dispatch({
          type: getData,
          payload: res,
        })
        if(updateData) { updateData(dispatch)}
      } catch (err) {
        addNotification({
          title: getData,
          type: "danger",
          message : "Unable to delete data"
        });
      }
    }
  }
}

export default actions
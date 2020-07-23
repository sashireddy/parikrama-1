import {addNotification} from "./notification";

const actions = (pageId,getEntityData,updateEntityData,addEntityData,deleteEntityData,updateData) => {

  const getData = 'GET_'+pageId;
  const loading = pageId+'_LOADING';
  const removeLoading = pageId+'_REMOVE_LOADING'
  const setLoading = () => {
    return {
        type: loading,
      }
  }
  const removeLoadingIcon = () => {
    return{
        type:removeLoading
    }
  }

  const notifyStatus = (res, title) => {
    if(res.flashMessage){
      addNotification({
        title: title,
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
        // notifyStatus(res, `LOAD ${pageId}`);
        dispatch({
          type: getData,
          payload: res,
        });
      } catch (err) {
        dispatch({
          type:removeLoading
        })
        addNotification({
          title: getData,
          type: "danger",
          message : "Unable to load data"
        });
      }
    },

    //loading operation
    setLoading,
    removeLoadingIcon,

    // Add Entity Unit
    addData: (data) => async (dispatch) => {
      dispatch(setLoading());
      try {
        const res = await addEntityData(data);
        notifyStatus(res, `ADD ${pageId}`);
        dispatch({
          type: getData,
          payload: res,
        });
        if(updateData) { updateData(dispatch)}
      } catch (err) {
        dispatch({
          type:removeLoading
        })
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
        notifyStatus(res, `UPDATE ${pageId}`);
        dispatch({
          type: getData,
          payload: res,
        });
        if(updateData) { updateData(dispatch)}
      } catch (err) {
        dispatch({
          type:removeLoading
        })
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
        notifyStatus(res,`DELETE ${pageId}`);
        dispatch({
          type: getData,
          payload: res,
        })
        if(updateData) { updateData(dispatch)}
      } catch (err) {
        dispatch({
          type:removeLoading
        })
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
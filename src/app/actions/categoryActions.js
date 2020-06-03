// import { CATEGORY_LOADING, GET_CATEGORIES, CATEGORY_LOAD_ERROR } from './types'
import { getCategoriesData, updateCategoryData, addCategoryData, deleteCategoryData } from '../dataAbstraction/category'

// Get categories
// export const getData = (data) => async (dispatch) => {
//   dispatch(setLoading())
//   try {
//     const categories = await getCategoriesData(data)
//     dispatch({
//       type: GET_CATEGORIES,
//       payload: categories,
//     })
//   } catch (err) {
//     dispatch({
//       type: CATEGORY_LOAD_ERROR,
//       payload: {},
//     })
//   }
// }

// // Category loading
// export const setLoading = () => {
//   return {
//     type: CATEGORY_LOADING,
//   }
// }

// // Add Category
// export const addData = (data) => async (dispatch) => {
//   dispatch(setLoading())
//   try {
//     const categories = await addCategoryData(data)
//     dispatch({
//       type: GET_CATEGORIES,
//       payload: categories,
//     })
//   } catch (err) {
//     dispatch({
//       type: CATEGORY_LOAD_ERROR,
//       payload: {},
//     })
//   }
// }

// // Update category
// export const updateData = (data) => async (dispatch) => {
//   dispatch(setLoading())
//   try {
//     const categories = await updateCategoryData(data)
//     dispatch({
//       type: GET_CATEGORIES,
//       payload: categories,
//     })
//   } catch (err) {
//     dispatch({
//       type: CATEGORY_LOAD_ERROR,
//       payload: {},
//     })
//   }
// }

// // Update category
// export const deleteData = (data) => async (dispatch) => {
//   dispatch(setLoading())
//   try {
//     const categories = await deleteCategoryData(data)
//     dispatch({
//       type: GET_CATEGORIES,
//       payload: categories,
//     })
//   } catch (err) {
//     dispatch({
//       type: CATEGORY_LOAD_ERROR,
//       payload: {},
//     })
//   }
// }






const actions = (pageId) => {
  // Get categories
  const getData = 'GET_'+pageId
  const loadError = pageId+'_LOAD_ERROR'
  const loading = pageId+'_LOADING'
  const setLoading = () => {
    return {
        type: loading,
      }
  }
  return {
    getData: (data) => async (dispatch) => {
      dispatch(setLoading())
      try {
        const categories = await getCategoriesData(data)
        dispatch({
          type: getData,
          payload: categories,
        })
      } catch (err) {
        dispatch({
          type: loadError,
          payload: {},
        })
      }
    },

    // Category loading
    setLoading,

    // Add Category
    addData: (data) => async (dispatch) => {
      dispatch(setLoading())
      try {
        const categories = await addCategoryData(data)
        dispatch({
          type: getData,
          payload: categories,
        })
      } catch (err) {
        dispatch({
          type: loadError,
          payload: {},
        })
      }
    },

    // Update category
    updateData: (data) => async (dispatch) => {
      dispatch(setLoading())
      try {
        const categories = await updateCategoryData(data)
        dispatch({
          type: getData,
          payload: categories,
        })
      } catch (err) {
        dispatch({
          type: loadError,
          payload: {},
        })
      }
    },

    // Update category
    deleteData: (data) => async (dispatch) => {
      dispatch(setLoading())
      try {
        const categories = await deleteCategoryData(data)
        dispatch({
          type: getData,
          payload: categories,
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

export {actions}
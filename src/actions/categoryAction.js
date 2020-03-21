import axios from 'axios'

export const FETCH_CATEGORY_BEGIN   = 'FETCH_CATEGORY_BEGIN';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_CATEGORY_FAILURE = 'FETCH_CATEGORY_FAILURE';

export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE';

export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAILURE = 'UPDATE_CATEGORY_FAILURE';

export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';

export function fetchCategories() {
    return dispatch => {
        dispatch(fetchCategoriesBegin());
        return axios.get('https://web-ios-api.herokuapp.com/categories')
        .then(response => {
            dispatch(fetchCategoriesSuccess(response.data.data));
            return response.data.data; 
        })
        .catch(error => dispatch(fetchCategoriesFailure(error)));
    };
  }

export function addCategory(category,token){
  return dispatch => {
    return axios.post('https://web-ios-api.herokuapp.com/categories',{"lib":category.lib, "type":category.type, "token":token})
    .then(response => {
      category.idCategory = response.data.data.idCategory
      dispatch(addCategorySuccess(category))
    })
    .catch(error => {
      dispatch(addCategoryFailure(error))
    })
  }
}


export function updateCategory(category,token){
  return dispatch => {
    return axios.put('https://web-ios-api.herokuapp.com/categories/'+category.idCategory,{"lib":category.lib, "type":category.type, "token":token})
    .then(response => {
      dispatch(updateCategorySuccess(category))
    })
    .catch(error => {
      dispatch(updateCategoryFailure(error))
    })
  }
}

export function deleteCategory(idCategory,token){
  return dispatch => {
    return axios.delete('https://web-ios-api.herokuapp.com/categories/'+idCategory, { 'headers': { 'Authorization': token } })
    .then(response => {
      dispatch(deleteCategorySuccess(idCategory))
    })
    .catch(error => {
      dispatch(deleteCategoryFailure(error))
    })
  }
}
  
export const fetchCategoriesBegin = () => ({
  type: FETCH_CATEGORY_BEGIN
});

export const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORY_SUCCESS,
  payload: { categories }
});

export const fetchCategoriesFailure = error => ({
  type: FETCH_CATEGORY_FAILURE,
  payload: { error }
});

export const addCategorySuccess = category => ({
  type: ADD_CATEGORY_SUCCESS,
  payload: { category }
})

export const addCategoryFailure = error => ({
  type: ADD_CATEGORY_FAILURE,
  payload: { error }
})

export const updateCategorySuccess = category => ({
  type: UPDATE_CATEGORY_SUCCESS,
  payload: { category }
})

export const updateCategoryFailure = error => ({
  type: UPDATE_CATEGORY_FAILURE,
  payload: { error }
})

export const deleteCategorySuccess = idCategory => ({
  type: DELETE_CATEGORY_SUCCESS,
  payload: { idCategory }
})

export const deleteCategoryFailure = error => ({
  type: DELETE_CATEGORY_FAILURE,
  payload: { error }
})
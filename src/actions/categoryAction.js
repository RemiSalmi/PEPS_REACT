import axios from 'axios'

export const FETCH_CATEGORY_BEGIN   = 'FETCH_CATEGORY_BEGIN';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_CATEGORY_FAILURE = 'FETCH_CATEGORY_FAILURE';

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
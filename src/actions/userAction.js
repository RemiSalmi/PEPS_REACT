import axios from 'axios'

export const FETCH_USER_BEGIN   = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export function fetchUsers() {
    return dispatch => {
        dispatch(fetchUsersBegin());
        return axios.get('https://web-ios-api.herokuapp.com/users')
        .then(response => {
            dispatch(fetchUsersSuccess(response.data.data));
            return response.data.data; 
        })
        .catch(error => dispatch(fetchUsersFailure(error)));
    };
  }
export const fetchUsersBegin = () => ({
  type: FETCH_USER_BEGIN
});

export const fetchUsersSuccess = users => ({
  type: FETCH_USER_SUCCESS,
  payload: { users }
});

export const fetchUsersFailure = error => ({
  type: FETCH_USER_FAILURE,
  payload: { error }
});
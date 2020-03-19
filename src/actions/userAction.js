import axios from 'axios'

export const FETCH_USER_BEGIN   = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

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

export function deleteUser(idUser,token){
  return dispatch => {
    return axios.delete('https://web-ios-api.herokuapp.com/users/'+idUser, { 'headers': { 'Authorization': token } })
    .then(response => {
      dispatch(deleteUserSuccess(idUser));
    })
    .catch(error => {
      dispatch(deleteUserFailure(error));
    })
  }
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

export const deleteUserSuccess = idUser => ({
  type: DELETE_USER_SUCCESS,
  payload: { idUser}
})

export const deleteUserFailure = error => ({
  type: DELETE_USER_FAILURE,
  payload: { error }
})
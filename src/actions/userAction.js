import axios from 'axios'

export const FETCH_USER_BEGIN   = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const UPDATE_ROLE_USER_SUCCESS = 'UPDATE_ROLE_USER_SUCCESS';
export const UPDATE_ROLE_USER_FAILURE = 'UPDATE_ROLE_USER_FAILURE';

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

export function addUser(user){
  return dispatch => {
    return axios.post('https://web-ios-api.herokuapp.com/users',user)
    .then(res => {
      user.idUser = res.data.data.idUser
      user.role = "user"
      dispatch(addUserSuccess(user))
    })
    .catch(error => {
      dispatch(addUserFailure(error))
    })
  }
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

export function updateUser(idUser,password,token){
  return dispatch => {
    return axios.put('https://web-ios-api.herokuapp.com/users/'+idUser, {'password':password,'token': token})
    .then(response => {
      dispatch(updateUserSuccess(idUser));
      console.log("ok")
    })
    .catch(error => {
      dispatch(updateUserFailure(error));
      console.log("pasok")
    })
  }
}

export function updateUserRole(idUser,role,token){
  return dispatch => {
    return axios.put('https://web-ios-api.herokuapp.com/users/role/'+idUser, {'role':role,'token': token})
    .then(response => {
      dispatch(updateUserRoleSuccess(idUser,role))
    })
    .catch(error => {
      dispatch(updateUserRoleFailure(idUser))
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

export const updateUserSuccess = idUser => ({
  type: UPDATE_USER_SUCCESS,
  payload: { idUser}
})

export const updateUserFailure = error => ({
  type: UPDATE_USER_FAILURE,
  payload: { error }
})

export const addUserSuccess = user => ({
  type: ADD_USER_SUCCESS,
  payload: { user }
})

export const addUserFailure = error => ({
  type: ADD_USER_FAILURE,
  payload: { error }
})

export const updateUserRoleSuccess = (idUser,role) => ({
  type: UPDATE_ROLE_USER_SUCCESS,
  payload: { idUser, role }
})

export const updateUserRoleFailure = error => ({
  type: UPDATE_ROLE_USER_FAILURE,
  payload: { error }
})
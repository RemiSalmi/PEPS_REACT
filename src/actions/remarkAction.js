import axios from 'axios'

export const FETCH_REMARK_BEGIN   = 'FETCH_REMARK_BEGIN';
export const FETCH_REMARK_SUCCESS = 'FETCH_REMARK_SUCCESS';
export const FETCH_REMARK_FAILURE = 'FETCH_REMARK_FAILURE';

export const ADD_REMARK_SUCCESS = 'ADD_REMARK_SUCCESS';
export const ADD_REMARK_FAILURE = 'ADD_REMARK_FAILURE';

export const DELETE_REMARK_SUCCESS = 'DELETE_REMARK_SUCCESS';
export const DELETE_REMARK_FAILURE = 'DELETE_REMARK_FAILURE';

export const UPDATE_REMARK_SUCCESS = 'UPDATE_REMARK_SUCCESS';
export const UPDATE_REMARK_FAILURE = 'UPDATE_REMARK_FAILURE';



export const ENCOUNTERED_SUCCESS = 'ENCOUNTERED_SUCCESS';
export const ENCOUNTERED_FAILURE = 'ENCOUNTERED_FAILURE';

export const DESENCOUNTERED_SUCCESS = 'DESENCOUNTERED_SUCCESS';
export const DESENCOUNTERED_FAILURE = 'DESENCOUNTERED_FAILURE';


export function fetchRemarks() {
  return dispatch => {
    dispatch(fetchRemarksBegin());
    return axios.get('https://web-ios-api.herokuapp.com/remarks')
    .then(responseRemarks => {
      return axios.get('https://web-ios-api.herokuapp.com/remarks/answers')
      .then(responseAnswers => {
        return axios.get('https://web-ios-api.herokuapp.com/remarks/encounters')
        .then(responseEncounter => {
          dispatch(fetchRemarksSuccess(responseRemarks.data.data,responseAnswers.data.data,responseEncounter.data.data));
          return responseRemarks.data.data; 
        })
        .catch(error => dispatch(fetchRemarksFailure(error)));
      })
      .catch(error => dispatch(fetchRemarksFailure(error)));  
    })
    .catch(error => dispatch(fetchRemarksFailure(error)));
  };
}

export function addRemarks(remark) {
  return dispatch => {
    return axios.post('https://web-ios-api.herokuapp.com/remarks',remark)
    .then(res => {
      remark.idRemark = res.data.data.idRemark
      dispatch(addRemarkSuccess(remark));
    })
    .catch(error => dispatch(addRemarkFailure(error)));
  };
}

export function deleteRemark(idRemark,token){
  return dispatch => {
    return axios.delete('https://web-ios-api.herokuapp.com/remarks/'+idRemark,{ 'headers': { 'Authorization': token } })
    .then(res => {
      dispatch(deleteRemarkSuccess(idRemark));
    })
    .catch(error => dispatch(deleteRemarkFailure(error)));
  }
}

export function updateRemark(remark,token){
  return dispatch =>{
    return axios.put('https://web-ios-api.herokuapp.com/remarks/'+remark.idRemark,{"remark":remark.remark,"idCategory":remark.idCategory,"token":token})
    .then(res => {
      dispatch(updateRemarkSuccess(remark));
    })
    .catch(error => {
      dispatch(updateRemarkFailure(error));
    })
  }
}

export function encounter(remark,token) {

  return dispatch => {
    return axios.post('https://web-ios-api.herokuapp.com/remarks/'+remark.idRemark+'/encounter',{"token" : token})
    .then(res => {
      dispatch(encounteredSuccess(remark,token));
    })
    .catch(error => {
      console.log(error)
      dispatch(encounteredFailure(error))
    });
  };
}

export function desencounter(remark,token) {
  return dispatch => {
    return axios.delete('https://web-ios-api.herokuapp.com/remarks/'+remark.idRemark+'/encounter',{ 'headers': { 'Authorization': token } })
    .then(res => {
      
      dispatch(desencounteredSuccess(remark,token));
    })
    .catch(error => dispatch(desencounteredFailure(error)));
  };
}

export const fetchRemarksBegin = () => ({
  type: FETCH_REMARK_BEGIN
});

export const fetchRemarksSuccess = (remarks,answers,encounters) => ({
  type: FETCH_REMARK_SUCCESS,
  payload: { remarks,answers,encounters }
});

export const fetchRemarksFailure = error => ({
  type: FETCH_REMARK_FAILURE,
  payload: { error }
});

export const addRemarkSuccess = remark => ({
  type: ADD_REMARK_SUCCESS,
  payload: { remark }
});

export const addRemarkFailure = error => ({
  type: ADD_REMARK_FAILURE,
  payload: { error }
});

export const encounteredSuccess = (remark,token) => ({
  type: ENCOUNTERED_SUCCESS,
  payload: { remark,token }
});

export const encounteredFailure = error => ({
  type: ENCOUNTERED_FAILURE,
  payload: { error }
});

export const desencounteredSuccess = (remark,token) => ({
  type: DESENCOUNTERED_SUCCESS,
  payload: { remark,token }
});

export const desencounteredFailure = error => ({
  type: DESENCOUNTERED_FAILURE,
  payload: { error }
});

export const deleteRemarkSuccess = (idRemark) => ({
  type : DELETE_REMARK_SUCCESS,
  payload: { idRemark }
})

export const deleteRemarkFailure = (error) => ({
  type : DELETE_REMARK_FAILURE,
  payload: { error }
})


export const updateRemarkSuccess = (remark) => ({
  type: UPDATE_REMARK_SUCCESS,
  payload: {remark}
})

export const updateRemarkFailure = (error) => ({
  type: UPDATE_REMARK_FAILURE,
  payload: {error}
})
import axios from 'axios'

export const FETCH_REMARK_BEGIN   = 'FETCH_REMARK_BEGIN';
export const FETCH_REMARK_SUCCESS = 'FETCH_REMARK_SUCCESS';
export const FETCH_REMARK_FAILURE = 'FETCH_REMARK_FAILURE';

export const ADD_REMARK_SUCCESS = 'ADD_REMARK_SUCCESS';
export const ADD_REMARK_FAILURE = 'ADD_REMARK_FAILURE';

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
import axios from 'axios'

export const FETCH_REMARK_BEGIN   = 'FETCH_REMARK_BEGIN';
export const FETCH_REMARK_SUCCESS = 'FETCH_REMARK_SUCCESS';
export const FETCH_REMARK_FAILURE = 'FETCH_REMARK_FAILURE';

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
import axios from 'axios'

export const FETCH_ANSWER_BEGIN   = 'FETCH_ANSWER_BEGIN';
export const FETCH_ANSWER_SUCCESS = 'FETCH_ANSWER_SUCCESS';
export const FETCH_ANSWER_FAILURE = 'FETCH_ANSWER_FAILURE';

export function fetchAnswers() {
    return dispatch => {
        dispatch(fetchAnswersBegin());
        return axios.get('https://web-ios-api.herokuapp.com/answers')
        .then(responseAnswers => {
            return axios.get('https://web-ios-api.herokuapp.com/answers/likes')
            .then(responseLikes => {
                dispatch(fetchAnswersSuccess(responseAnswers.data.data,responseLikes.data.data));
                return responseAnswers.data.data; 
            })
            .catch(error => dispatch(fetchAnswersFailure(error)));  
        })
        .catch(error => dispatch(fetchAnswersFailure(error)));
    };
  }
export const fetchAnswersBegin = () => ({
  type: FETCH_ANSWER_BEGIN
});

export const fetchAnswersSuccess = (answers,likes) => ({
  type: FETCH_ANSWER_SUCCESS,
  payload: { answers, likes }
});

export const fetchAnswersFailure = error => ({
  type: FETCH_ANSWER_FAILURE,
  payload: { error }
});
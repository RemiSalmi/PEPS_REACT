import axios from 'axios'

export const FETCH_ANSWER_BEGIN   = 'FETCH_ANSWER_BEGIN';
export const FETCH_ANSWER_SUCCESS = 'FETCH_ANSWER_SUCCESS';
export const FETCH_ANSWER_FAILURE = 'FETCH_ANSWER_FAILURE';

export const LIKE_SUCCESS = 'LIKE_SUCCESS';
export const LIKE_FAILURE = 'LIKE_FAILURE';

export const DISLIKE_SUCCESS = 'DISLIKE_SUCCESS';
export const DISLIKE_FAILURE = 'DISLIKE_FAILURE';

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
export function like(answer,token) {
  return dispatch => {
    return axios.post('https://web-ios-api.herokuapp.com/answers/'+answer.idAnswer+'/likes',{"token" : token})
    .then(res => {
      dispatch(likeSuccess(answer,token));
    })
    .catch(error => {
      console.log(error)
      dispatch(likeFailure(error))
    });
  };
}
export function dislike(answer,token) {
  return dispatch => {
    return axios.delete('https://web-ios-api.herokuapp.com/answers/'+answer.idAnswer+'/likes',{ 'headers': { 'Authorization': token } })
    .then(res => {
      dispatch(dislikeSuccess(answer,token));
    })
    .catch(error => {
      console.log(error)
      dispatch(dislikeFailure(error))
    });
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

export const likeSuccess = (answer,token) => ({
  type: LIKE_SUCCESS,
  payload: { answer,token }
});

export const likeFailure = error => ({
  type: LIKE_FAILURE,
  payload: { error }
});

export const dislikeSuccess = (answer,token) => ({
  type: DISLIKE_SUCCESS,
  payload: { answer,token }
});

export const dislikeFailure = error => ({
  type: DISLIKE_FAILURE,
  payload: { error }
});
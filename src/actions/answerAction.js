import axios from 'axios'

export const FETCH_ANSWER_BEGIN   = 'FETCH_ANSWER_BEGIN';
export const FETCH_ANSWER_SUCCESS = 'FETCH_ANSWER_SUCCESS';
export const FETCH_ANSWER_FAILURE = 'FETCH_ANSWER_FAILURE';

export const LIKE_SUCCESS = 'LIKE_SUCCESS';
export const LIKE_FAILURE = 'LIKE_FAILURE';

export const ADD_ANSWER_SUCCESS = 'ADD_ANSWER_SUCCESS';
export const ADD_ANSWER_FAILURE = 'ADD_ANSWER_FAILURE';

export const UPDATE_ANSWER_SUCCESS = 'UPDATE_ANSWER_SUCCESS';
export const UPDATE_ANSWER_FAILURE = 'UPDATE_ANSWER_FAILURE';

export const DISLIKE_SUCCESS = 'DISLIKE_SUCCESS';
export const DISLIKE_FAILURE = 'DISLIKE_FAILURE';

export const DELETE_ANSWER_SUCCESS = 'DELETE_ANSWER_SUCCESS';
export const DELETE_ANSWER_FAILURE = 'DELETE_ANSWER_FAILURE';

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

export function deleteAnswer(idAnswer,token){
  return dispatch =>{
    return axios.delete('https://web-ios-api.herokuapp.com/answers/'+idAnswer, { 'headers': { 'Authorization': token } })
    .then(res => {
      dispatch(deleteAnswerSuccess(idAnswer));
    })
    .catch(error => {
      dispatch(deleteAnswerFailure(error));
    })
  }
}

export function addAnswer(answer,token){
  return dispatch => {
    return axios.post('https://web-ios-api.herokuapp.com/answers',{"answer":answer.answer, "idCategory":answer.idCategory, "token":token})
    .then(res => {
      answer.idAnswer = res.data.data.idAnswer
      console.log(answer.answer)
      dispatch(addAnswerSuccess(answer,token))
    })
    .catch(error => {
      dispatch(addAnswerFailure(error))
      console.log("erreur")
    })
  }
}

export function updateAnswer(answer,token){
  return dispatch => {
    return axios.put('https://web-ios-api.herokuapp.com/answers/'+answer.idAnswer, {"answer":answer.answer, "idCategory":answer.idCategory, "token":token})
    .then(res => {
      dispatch(updateAnswerSuccess(answer))
    })
    .catch(error => {
      dispatch(updateAnswerFailure(error))
    })
  }
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

export const deleteAnswerSuccess = (idAnswer) => ({
  type: DELETE_ANSWER_SUCCESS,
  payload: { idAnswer }
})

export const deleteAnswerFailure = (error) => ({
  type: DELETE_ANSWER_FAILURE,
  payload: {error}
})

export const addAnswerSuccess = (answer,token) => ({
  type: ADD_ANSWER_SUCCESS,
  payload: { answer, token}
})

export const addAnswerFailure = (error) => ({
  type: ADD_ANSWER_FAILURE,
  payload: { error }
})

export const updateAnswerSuccess = (answer) => ({
  type: UPDATE_ANSWER_SUCCESS,
  payload: { answer }
})

export const updateAnswerFailure = (error) => ({
  type: UPDATE_ANSWER_FAILURE,
  payload: { error }
})
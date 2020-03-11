import axios from 'axios'

export const getAllAnswers  = () =>{
    return (dispatch, getState) => {
        axios.get('https://web-ios-api.herokuapp.com/answers')
        .then(response => {
            let answers = response.data.data;

            axios.get('https://web-ios-api.herokuapp.com/answers/likes')
            .then(res => {
                let likes = res.data.data
                dispatch({type: 'FETCH_ALL_ANSWERS', answers,likes})
            })
        })
        .catch(err => {
            console.log(err)
        })
    }   
}
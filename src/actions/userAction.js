import axios from 'axios'

export const getAllUsers  = () =>{
    return (dispatch, getState) => {
        axios.get('https://web-ios-api.herokuapp.com/users')
        .then(response => {
            let users = response.data.data;
            dispatch({type: 'FETCH_ALL_USERS', users: users})
        })
        .catch(err => {
            console.log(err)
        })
    }   
}
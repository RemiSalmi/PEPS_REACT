import axios from 'axios'

export const getAllRemarks  = () =>{
    return (dispatch, getState) => {
        axios.get('https://web-ios-api.herokuapp.com/remarks')
        .then(response => {
            let remarks = response.data.data;
            dispatch({type: 'FETCH_ALL_REMARK', remarks: remarks})
        })
        .catch(err => {
            console.log(err)
        })
    }   
}

export const addRemark  = (remark) =>{
    return (dispatch, getState) => {
        dispatch({type: 'ADD_REMARK', remark})
    }   
}
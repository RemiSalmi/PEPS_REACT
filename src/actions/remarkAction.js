import axios from 'axios'

export const getAllRemarks  = () =>{
    return (dispatch, getState) => {
        axios.get('https://web-ios-api.herokuapp.com/remarks')
        .then(response => {
            let remarks = response.data.data;

            axios.get('https://web-ios-api.herokuapp.com/remarks/answers')
            .then(res => {
                let links = res.data.data

                axios.get('https://web-ios-api.herokuapp.com/remarks/encounters')
                .then(r => {
                    let encounters = r.data.data
                    dispatch({type: 'FETCH_ALL_REMARK', remarks, links,encounters})
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
    }   
}

export const addRemark  = (remark) =>{
    return (dispatch, getState) => {
        axios.post('https://web-ios-api.herokuapp.com/remarks',remark)
        .then(response => {
            console.log(response)
            dispatch({type: 'ADD_REMARK', remark})
        })
        .catch(err => {
            console.log(err)
        })
    }   
}
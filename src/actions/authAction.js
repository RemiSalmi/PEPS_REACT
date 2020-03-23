export const CHECK_AUTH   = 'CHECK_AUTH';
export const CHECK_ADMIN   = 'CHECK_ADMIN';
var jwt = require('jsonwebtoken');

export function checkLogin() {
    return dispatch => {
        var isAdmin = false
        const isConnected = sessionStorage.getItem('token') !== null
        if(isConnected){
            isAdmin = jwt.decode(sessionStorage.getItem('token')).role === "admin"
        }
        dispatch(checked(isConnected,isAdmin))
    }
}


export const checked = (isConnected,isAdmin) => ({
    type: CHECK_AUTH,
    payload: {isConnected,isAdmin}
});

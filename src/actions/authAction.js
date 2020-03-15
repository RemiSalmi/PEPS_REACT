export const CHECK_AUTH   = 'CHECK_AUTH';

export function checkLogin() {
    return dispatch => {
        const isConnected = sessionStorage.getItem('token') !== null
        dispatch(checked(isConnected))
    }
}

export const checked = (isConnected) => ({
    type: CHECK_AUTH,
    payload: {isConnected}
});
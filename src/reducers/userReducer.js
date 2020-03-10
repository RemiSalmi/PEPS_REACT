const initState = {
    users : {
        byId : {
        },
        allIds : []
    },
}

const userReducer = (state = initState, action) =>{
    switch (action.type){
        case 'FETCH_ALL_USERS' :
            let newUsers = state.users
            action.users.map(user => {
                newUsers.byId[user.idUser] = user
                newUsers.allIds.push(user.idUser)
                return newUsers
            })
            return {
                ...state,
                users : newUsers
            }
        default:        
    }
    return state
}

export default userReducer 
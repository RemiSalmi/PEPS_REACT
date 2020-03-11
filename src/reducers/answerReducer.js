const initState = {
    answers : {
        byId : {
        },
        allIds : []
    },
}

const answerReducer = (state = initState, action) =>{
    switch (action.type){
        case 'FETCH_ALL_ANSWERS' :

            let newAnswers = state.answers
            action.answers.map(answer => {
                answer.likes = [] 
                newAnswers.byId[answer.idAnswer] = answer
                newAnswers.allIds.push(answer.idAnswer)
                return newAnswers
            })

            action.likes.map(like =>{
                newAnswers.byId[like.idAnswer].likes.push(like.idUser)
                return newAnswers
            })
            return {
                ...state,
                answers : newAnswers
            }
        default:        
    }
    return state
}

export default answerReducer 
const initState = {
    remarks : {
        byId : {
        },
        allIds : []
    },
}

const remarkReducer = (state = initState, action) =>{
    switch (action.type){
        case 'FETCH_ALL_REMARK' :
            console.log(action.encounters)

            let newRemarks = state.remarks
            action.remarks.map(remark => {
                remark.encounters = []
                remark.answers = [] 
                newRemarks.byId[remark.idRemark] = remark
                newRemarks.allIds.push(remark.idRemark)
                return newRemarks
            })

            action.links.map(answer => {
                newRemarks.byId[answer.idRemark].answers.push(answer.idAnswer)
                return newRemarks
            })

            action.encounters.map(encounter => {
                newRemarks.byId[encounter.idRemark].encounters.push(encounter.idUser)
                return newRemarks
            })

            return {
                ...state,
                remarks : newRemarks
            }
        case 'ADD_REMARK' :
            return {
                ...state,
                remarks : [...state.remarks, action.remark]
            }
        default:        
    }
    return state
}

export default remarkReducer 
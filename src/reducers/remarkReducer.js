const initState = {
    remarks: [
    ]
}

const remarkReducer = (state = initState, action) =>{
    switch (action.type){
        case 'FETCH_ALL_REMARK' :
            let newRemarks = [...state.remarks]
            action.remarks.map(remark => {
                return newRemarks.push(remark)
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
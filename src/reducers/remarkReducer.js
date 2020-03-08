const initState = {
    remarks: [
    ]
}

const remarkReducer = (state = initState, action) =>{
    switch (action.type){
        case 'FETCH_ALL_REMARK' :
            let newRemarks = [...state.remarks]
            action.remarks.map(remark => {
                newRemarks.push(remark)
            })
            return {
                ...state,
                remarks : newRemarks
            }
            break;
        case 'ADD_REMARK' :
            return {
                ...state,
                remarks : [...state.remarks, action.remark]
            }
            break;
        default:        
    }
    return state
}

export default remarkReducer 
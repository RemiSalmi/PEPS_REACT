import remarkReducer from './remarkReducer'
import answerReducer from './answerReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    remark: remarkReducer,
    answer: answerReducer
})

export default rootReducer
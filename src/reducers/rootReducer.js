import remarkReducer from './remarkReducer'
import answerReducer from './answerReducer'
import userReducer from './userReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    remark: remarkReducer,
    user: userReducer,
    answer: answerReducer
})

export default rootReducer
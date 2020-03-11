import remarkReducer from './remarkReducer'
import answerReducer from './answerReducer'
import userReducer from './userReducer'
import authReducer from './authReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    remark: remarkReducer,
    user: userReducer,
    answer: answerReducer,
    auth: authReducer,
})

export default rootReducer
import remarkReducer from './remarkReducer'
import answerReducer from './answerReducer'
import userReducer from './userReducer'
import authReducer from './authReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    remarks: remarkReducer,
    users: userReducer,
    answers: answerReducer,
    auth: authReducer,
})

export default rootReducer
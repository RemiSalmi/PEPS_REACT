import remarkReducer from './remarkReducer'
import answerReducer from './answerReducer'
import userReducer from './userReducer'
import authReducer from './authReducer'
import categoryReducer from './categoryReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    remarks: remarkReducer,
    users: userReducer,
    answers: answerReducer,
    auth: authReducer,
    categories: categoryReducer
})

export default rootReducer
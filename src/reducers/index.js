import { combineReducers } from "redux"
import auth from "./auth"
import flashMessages from "./flashMessages"
import userInfo from './userInfo'

const rootReducer = combineReducers({
    auth,
    flashMessages,
    userInfo
}) 
export default rootReducer
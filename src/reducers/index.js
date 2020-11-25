import { combineReducers } from "redux"
import auth from "./auth"
import flashMessages from "./flashMessages"
import userInfo from './userInfo'
import onlineGameInfo from "./onlineGameInfo";

const rootReducer = combineReducers({
    auth,
    flashMessages,
    userInfo,
    onlineGameInfo
}) 
export default rootReducer
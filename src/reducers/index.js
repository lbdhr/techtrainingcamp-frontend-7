import { combineReducers } from "redux"
import auth from "./auth"
import flashMessages from "./flashMessages"
import userInfo from './userInfo'
import onlineGameInfo from "./onlineGameInfo";
import gameReducer from './gameReducer'

const rootReducer = combineReducers({
    auth,
    flashMessages,
    userInfo,
    onlineGameInfo,
    gameReducer
}) 
export default rootReducer
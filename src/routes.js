import React from 'react'
import { Route } from "react-router-dom"
import App from "./components/App"
import SignupPage from "./components/signup/SignupPage"
import LoginPage from "./components/login/LoginPage"
import OfflineGame from "./components/userCenter/OfflineGame"
import Rankings from "./components/userCenter/ranking/RankingList"
import JoinRoom from "./components/userCenter/onlineGame/JoinRoom"

import requireAuth from "./utils/requireAuth"

export default(
    <div className="container">
        <Route exact path="/" component={ App }></Route>
        <Route path="/signup" component={ SignupPage }></Route>
        <Route path="/login" component={ LoginPage }></Route>
        <Route path="/offlinegame" component={ requireAuth(OfflineGame) }></Route>
        <Route path="/onlinegame" component={ requireAuth(JoinRoom) }></Route>
        <Route path="/rankings" component={ requireAuth(Rankings) }></Route>
    </div>
)
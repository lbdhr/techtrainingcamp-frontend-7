import React from 'react'
import { Route } from "react-router-dom"
import App from "./components/App"
import SignupPage from "./components/signup/SignupPage"
import LoginPage from "./components/login/LoginPage"
import GamePage from "./components/game/GamePage"

import requireAuth from "./utils/requireAuth"

export default(
    <div className="container">
        <Route exact path="/" component={ App }></Route>
        <Route path="/signup" component={ SignupPage }></Route>
        <Route path="/login" component={ LoginPage }></Route>
        <Route path="/game" component={ requireAuth(GamePage) }></Route>
    </div>
)
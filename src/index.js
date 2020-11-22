import React from 'react';
import ReactDOM from 'react-dom';

import logger from "redux-logger"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"

import rootReducer from "./reducers"

import routes from "./routes"
import { BrowserRouter as Router } from "react-router-dom"

import NavigationBar from "./components/NavigationBar"
import FlashMessagesList from "./components/flash/FlashMessagesList"
import setAuthorizationToken from "./utils/setAuthorizationToken"
import { setCurrentUser } from "./actions/login"
import jwtDecode from "jwt-decode"

import Main from './Main';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)))

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}


// import Test from './test';

ReactDOM.render(
  <Provider store={ store }>
      <Router routes={ routes }>
          <NavigationBar />
          <FlashMessagesList />
          { routes }
      </Router>
  </Provider>
  , 
  document.getElementById('root'));

// import './index.css';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <Main />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
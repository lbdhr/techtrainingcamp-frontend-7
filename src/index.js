import React from 'react';
import ReactDOM from 'react-dom';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';

import routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import FlashMessagesList from './components/flash/FlashMessagesList';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/login';
import jwtDecode from 'jwt-decode';

import Main from './pages/Main';
import gameStore from './gameReducers/gameStore';
import './index.css';

// 接入服务器及注册登录部分
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)))

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

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


// 2048游戏部分
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={gameStore}>
//       <Main />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );



// long long ago部分

// import Test from './test';
// 这里是加入登陆验证的页面布置
// ReactDOM.render(
//   <Provider store={ store }>
//       <Router routes={ routes }>
//           <NavigationBar />
//           <FlashMessagesList />
//           { routes }
//       </Router>
//   </Provider>
//   ,
//   document.getElementById('root'));

// import reportWebVitals from './reportWebVitals';

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

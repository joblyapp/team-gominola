import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import bootstrap from 'bootstrap'
import "./styles/css/styles.css"
import "./styles/scss/root.scss"
import { Provider } from 'react-redux';
import { storeAsync } from "./redux/store/config"
import RoutesDispatch from './routes/routesDispatch';
const store = storeAsync()
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RoutesDispatch></RoutesDispatch>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

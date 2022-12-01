import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from './app/store'
import appConfig from "./app/config"

import App from "./App";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "@popperjs/core"

// AXIOS
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = appConfig.apiURL
axios.defaults.headers['Content-Type'] = 'application/json'

// Set the AUTH token for any request
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('vitaltoken')
  config.headers.Authorization =  token ? `${token}` : ''
  return config;
})

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// Notyf
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'
window.notyf = new Notyf({dismissible:true})

const rootElement = document.getElementById("root")
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        {/* <ToastContainer /> */}
      </Router>
    </Provider>
  </React.StrictMode>,
  rootElement
);

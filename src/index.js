import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.scss'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <App />
      <ToastContainer position="top-center" autoClose={3000} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

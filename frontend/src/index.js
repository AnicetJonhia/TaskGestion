import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';  // Import Font Awesome CSS
import 'mdb-ui-kit/css/mdb.min.css';  // Import MDB UI Kit CSS
import App from './App';
import reportWebVitals from './reportWebVitals';
import './App.css';
import "./css/Sidebar.css";
import "./css/MainContent.css"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

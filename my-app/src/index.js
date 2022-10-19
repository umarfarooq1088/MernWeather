import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Weather from "./Weather";
import About from './About';
import Register from './Register';
import Login from './Login';
import Data from './Data';
import Country from './Country';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <BrowserRouter>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  // </BrowserRouter>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="Weather" element={<Weather />} />
      <Route path="About" element={<About />} />
      <Route path="Register" element={<Register />} />
      <Route path="Login" element={<Login />} />
      <Route path="Data" element={<Data />} />
      <Route path="Country" element={<Country />} />
    </Routes>
  </BrowserRouter>
);


reportWebVitals();

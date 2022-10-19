import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';
function Navbar(){
  return(
    <>
    <nav className='navbar navbar-expand-lg d-flex justify-content-around'>
  <div className="container-fluid">

    <Link className="navbar-brand" to="/">Weather</Link>
    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}
    <div className='float-right'>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        <li className="nav-item">
         
        <Link to="/">Home</Link>
        </li>
        <li className="nav-item ">
        <Link to="/Weather">Weather</Link>
        </li> <li className="nav-item">
        <Link to="/About">About</Link>
        </li>
         {/* <li className="nav-item">
        <Link to="/Country">Exchange</Link>
        </li> */}
        <li className="nav-item">
        <Link to="/Register">Registration</Link>
        </li>
        <li className="nav-item">
        <Link to="/Login">Login</Link>
        </li>
        {/* <li className="nav-item">
        <Link to="/Data">Data</Link>
        </li> */}
      </ul>
      </div>
    </div>
  </div>
</nav>
  </>
  );
}

export default Navbar;
import React from 'react';
import { Link } from "react-router-dom";
import './App.css';
function Home(){
  return(
    <>
   <h1>Welcome to Weather Application</h1>
<div className='buton'>
{/* <a  class="buton">Check Weather →</a> */}
<Link to="/Weather">Check Weather →</Link>
</div>
<div className='buton'>
  <Link to="/Country">Check Exchange Rate →</Link>  
</div>
  </>
  );
}

export default Home;

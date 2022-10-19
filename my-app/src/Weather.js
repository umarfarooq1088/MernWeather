import React, {useState} from 'react';
import Navbar from './Navbar';
import Api from './API';
import './App.css';
import axios from 'axios';

 function Weather(){
  const[text, setText] =useState();
  const[passs, setElemtent] =useState()
 
  const handleClick=()=>{
setElemtent(text);
 const pass=text;
 if(pass===""){
  console.log("nothing");
 }
 else{
axios.post('http://localhost:5000/TestAPI/abc', {
  pass:pass},{
  headers: {
    "Content-Type": "application/json",
  },
})
.then(function (response) {
  // console.log(response);
})
.catch(function (error) {
  console.log(error);
});}
  }


  const handleOnChange =(event) =>{
 setText(event.target.value)
  } 
  return(
    <>
    <Navbar/>
  <h2>weather</h2>
  <div className='card container'>
  <form>
  <div className="form">
    <input type="text" className="text" value={text} onChange={handleOnChange} placeholder="Enter City" /> 
  </div>
  <button type="button" className="btn btn-primary d-flex center" onClick={handleClick}>Search</button>
</form>
</div>
 <Api city={passs} />
  </>
  );
}
export default Weather;


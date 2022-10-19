// import React, { useEffect, useState } from 'react';
// import {useNavigate} from "react-router-dom";
import Navbar from './Navbar';
import './App.css';

const About= () => {
  // const navigate = useNavigate();
  // // const [userData, setUserdata] =useState({});
  // const CallAboutPage = async ( ) => {
  //   try {
                    
  //       const res = await fetch ('/about', {
  //           method :"GET",
  //           headers : {
  //             Accept : "appllication/json" ,
  //             "Content-Type" : "application/json"
  //              },
  //              credentials : "include"
  //           });
  //           const data = await res.json();
  //           console.log(data);
  //           // setUserdata(data);

  //           if (res.ok) {
  //             console.log("Succesfully login"); 
            
  //          } else {
  //           console.log(res.err); 
  //           }
           
  //   } catch(err) {
  //     console.log(err) ;
  //     navigate('/Login');
  //   }}
  //      useEffect(() =>{
  //       CallAboutPage();
  //      },[]);
      
  return(
    <>
       <Navbar/>
       <h1>umer farooq</h1>
 {/* <form method='GET'>
  
 </form> */}
 
  </>
  );

 }
export default About;
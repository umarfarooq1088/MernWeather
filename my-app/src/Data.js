import React, { useEffect } from "react";
import { useState } from "react";
import './App.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import Navbar from './Navbar';
function Data(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
   
     const callback=() =>{  axios.get(`http://localhost:5000/users`)
        
        .then((result) =>{
          setIsLoaded(true);
          setItems(result.data); 
          // console.log(result.data)
        },
         (error)=> {
            setIsLoaded(true);
            setError(error);
        });}
        useEffect(()=>{
          callback();
        },[]);
        if (error) {
                  return <div><h3>Error: {error.message}</h3></div>;
                } else if (!isLoaded) {
                  return <div> <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}  
                  open>
                  <CircularProgress color="inherit" />
                </Backdrop></div>;
   } else{
let val=1;
    return(
        <>
        <Navbar/>
      
       {items?.results?.map(item => (
                <>
                <h3 id="lab">Entry No {val++} : </h3>
                <div className="result">
                <h6 key={item.id}>First Name : {item.firstName} </h6>
                <h6 key={item.id}>Last Name : {item.lastName} </h6>
                <h6 key={item.id}>Data of Birth : {item.birthdayDate} </h6>
                <h6  key={item.id}>Email : {item.emailAddress} </h6>
                <h6  key={item.id}>Phone NO : {item.phoneNumber} </h6>  
                <h6  key={item.id}>Address : {item.Address} </h6> 
                </div>
                </>  
                       ))} 
 
        </>
    )}

}
export default Data;



// function Api(props) {

    
//     useEffect(() => {
//         // const url =`https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=7b77242d6509244bcd3ea03b14e6dfad`;
       
//     }, [props.city]);
  
//    
//     } else if(props.city ==null){
//         return(
//         <h1>Search to check Weather</h1>       
//  )}
//  else if(items.main == null){
//     return(
//     <>
//         <h1>Weather of {props.city} city</h1>
//            <h3>Date Not Found </h3>
//            <h4>Spelling mistake Or Network error</h4>
//      </>

//  )}
//     else {
//         if(items.main === isLoaded){
//             return(
//             <div> <Backdrop
//       sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//       open>
//       <CircularProgress color="inherit" />
//     </Backdrop></div>
//        ) }  
//        else{     
//       return (
//    <> 
//     <h1>Weather of {props.city} city</h1>
//          <ul>
//                <h2>City : {items.name}</h2>
//                  {items?.weather?.map(item => (
//                <h2  key={item.id}>Weather : {item.main} </h2>   
//               ))}
//                   <h2>Humidity : {items.main?.humidity}</h2>
//                   <h2>Temp : {items.main?.temp}</h2>
                  
//               </ul>
//      </>
//       );}
//     }
// }


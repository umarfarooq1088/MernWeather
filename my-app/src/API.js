import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import axi from "./axi";
import axios from "axios";

function Api(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        // const url =`https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=7b77242d6509244bcd3ea03b14e6dfad`;
        if(props.city){
        axios.get(`http://localhost:5000/TestAPI`)
        
        .then((result) =>{
          setIsLoaded(true);
          setItems(result.data); 
          // console.log(result.data)
        },
         (error)=> {
            setIsLoaded(true);
            setError(error);
        });
      }
      else{
        setIsLoaded(true);
      }
    }, [props.city]);
  
    if (error) {
      return <div><h3>Error: {error.message}</h3></div>;
    } else if (!isLoaded) {
      return <div> <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}  
      open>
      <CircularProgress color="inherit" />
    </Backdrop></div>;
    } else if(props.city ==null){
        return(
        <h1>Search to check Weather</h1>       
 )}
 else if(items.main == null){
    return(
    <>
        <h1>Weather of {props.city} city</h1>
           <h3>Date Not Found </h3>
           <h4>Spelling mistake Or Network error</h4>
     </>

 )}
    else {
        if(items.main === isLoaded){
            return(
            <div> <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open>
      <CircularProgress color="inherit" />
    </Backdrop></div>
       ) }  
       else{     
      return (
   <> 
    <h1>Weather of {props.city} city</h1>
         <ul>
               <h2>City : {items.name}</h2>
                 {items?.weather?.map(item => (
               <h2  key={item.id}>Weather : {item.main} </h2>   
              ))}
                  <h2>Humidity : {items.main?.humidity}</h2>
                  <h2>Temp : {items.main?.temp}</h2>
                  
              </ul>
     </>
      );}
    }
}
export default Api;




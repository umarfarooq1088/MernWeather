import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import Navbar from './Navbar';
function Login(){
 const navigate = useNavigate();
const [emailAddress, setEmail] = useState("");
const [pasword, setpassword] = useState("");

const loginUser=async (e) =>{
    e.preventDefault();
    await fetch('http://localhost:5000/signin',{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        emailAddress,
        pasword
      })
    }).then(response => {
         if (response.ok) {
            window.alert("Succesfully login"); 
            navigate('/Data');
         } else {
          window.alert("Invalid Credientials"); 
          }
         })
  //   const data = await response.json();
  //   if(data.status === 400 || !data){
  //     window.alert("Succesfully login"); 
  //     navigate('/Data');
   
  //   }else{
  //     window.alert("Invalid Credientials"); 
  //   }
   } 

return(
<>
<Navbar/>
<section className="vh-100" >
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong">
          <div className="card-body p-5 text-center">

            <h3 className="mb-5">Sign in</h3>

            <div className="form-outline mb-4">
              <input type="email" id="typeEmailX-2" className="form-control form-control-lg" placeholder='Email' 
              value={emailAddress} onChange={(e) => setEmail(e.target.value)} />
              <label className="form-label" htmlFor="typeEmailX-2"></label>
            </div>

            <div className="form-outline mb-4">
              <input type="password" id="typePasswordX-2" className="form-control form-control-lg" placeholder='Password'
              value={pasword} onChange={(e) =>setpassword(e.target.value)} />
              <label className="form-label" htmlFor="typePasswordX-2"></label>
            </div>

            {/* <!-- Checkbox --> */}
            <div className="form-check d-flex justify-content-start mb-4">
              <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
              <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
            </div>

            <button className="btn btn-primary btn-lg btn-block px-5" type="submit" value="login" onClick={loginUser}>Login</button>
            <div>
              <p className="mb-0">Don't have an account? <a href="./Register" className=" fw-bold">Sign Up</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</>
)}
export default Login;
import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "./Navbar";
function Register(){
  const navigate = useNavigate();
        const [user, setUser] =useState({
            firstName:"", lastName:"", birthdayDate:"", emailAddress:"", phoneNumber:"", Address:"",pasword:"", cpasword:""
        })
        let name,value;
        const handleInputs=(e) =>{
            name = e.target.name;
            value=e.target.value;
            setUser({...user,[name]:value});
        }

        const POSTDATA =async (e) =>{
          e.preventDefault();
          const { firstName, lastName, birthdayDate, emailAddress, phoneNumber, Address, pasword, cpasword} = user;
          await fetch('http://localhost:5000/register',{
            method:"POST",
            headers:{
              "Content-Type" : "application/json"
            },
            body:JSON.stringify({
              firstName, lastName, birthdayDate, emailAddress, phoneNumber, Address, pasword, cpasword
            })
          }).then(response => {
            if (response.ok) {
              window.alert("Succesfully Registeration");
              navigate('/Login');
            } else {
              window.alert("Invalid Registeration");
             }
            })
          // const data = await response.json();
          // if(data.status === 422 || !data){
          //   window.alert("Invalid Registeration");
          // }else{
          //   window.alert("Succesfully Registeration");
        
          //   navigate('/Login');
          // }
        }

    return(
        <>
         <Navbar/>
         <section className="vh-100 gradient-custom">
  <div className="container py-5 ">
    <div className="row justify-content-center align-items-center h-100">
      <div className="col-12 col-lg-9 col-xl-7">
        <div className="card shadow-2-strong card-registration" >
          <div className="card-body p-4 p-md-5">
            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
            <form method="POST">

              <div className="row">
                <div className="col-md-6 mb-2">

                  <div className="form-outline">
                    <input type="text" name="firstName" value={user.firstName} onChange={handleInputs} id="firstName" className="form-control form-control-lg" placeholder="First Name"/>
                    <label className="form-label" ></label>
                  </div>

                </div>
                <div className="col-md-6 mb-2">

                  <div className="form-outline">
                    <input type="text" name="lastName" value={user.lasttName} onChange={handleInputs} id="lastName" className="form-control form-control-lg" placeholder="Last Name" />
                    <label className="form-label" ></label>
                  </div>

                </div>
              </div>
              

              <div className="row">
                <div className="col-md-6 mb-2 d-flex align-items-center">

                  <div className="form-outline datepicker w-100">
                    <input type="text" name="birthdayDate" value={user.birthdayDate} onChange={handleInputs} className="form-control form-control-lg" id="birthdayDate" placeholder="Birthday" />
                    <label  className="form-label"></label>
                  </div>
                </div>
                </div>
                {/* <div className="col-md-6 mb-2">

                  <h6 className="mb-2 pb-1"> Gender: </h6>

                  <div className="form-check form-check-inline">
                    <input className="form-check-input"  value={user.inlineRadioOptions} onChange={handleInputs} type="radio" name="inlineRadioOptions" id="femaleGender"
                      checked />
                    <label className="form-check-label" >Female</label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions"  value={user.inlineRadioOptions} onChange={handleInputs} id="maleGender"
                       />
                    <label className="form-check-label">Male</label>
                  </div>
                </div>
              </div> */}
              <input className="form-control form-control-lg" type="text" name="Address" value={user.Address} onChange={handleInputs} id="Address" placeholder="Address" />
              <div className="row">
                <div className="col-md-6 mb-2 pt-3">

                  <div className="form-outline">
                    <input type="email" id="emailAddress" name="emailAddress" value={user.emailAddress} onChange={handleInputs} className="form-control form-control-lg" placeholder="Email" />
                    <label className="form-label" ></label>
                  </div>

                </div>
                <div className="col-md-6 mb-2 pt-3">

                  <div className="form-outline">
                    <input type="tel" id="phoneNumber" name="phoneNumber" value={user.phoneNumber} onChange={handleInputs} className="form-control form-control-lg" placeholder="Phone Number"/>
                    <label className="form-label" ></label>
                  </div>

                </div>
              </div>
             
              <input className="form-control form-control-lg pb-2 mb-3" type="text" name="pasword" value={user.pasword} onChange={handleInputs} id="password" placeholder="Pasword" />
              <input className="form-control form-control-lg" type="text" name="cpasword" value={user.cpasword} onChange={handleInputs} id="cpasword" placeholder="Confirm Pasword" />

              <div className="mt-4 pt-2">
                <input className="btn btn-primary btn-lg form-submit" type="submit" value="register" name="signup" id="signup" 
                 onClick={POSTDATA} />
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </>
    )
}
export default Register;
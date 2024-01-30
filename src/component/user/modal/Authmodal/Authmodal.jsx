import React, { useContext, useEffect, useState } from 'react'
import authlogo from '../../../../assets/Authlogo.png'
import { Await, Link, json } from 'react-router-dom';
import axios from '../../axios';
import Usercontext from '../../context/Usercontext';

Usercontext
export default function Authmodal(props) {
  const { isLogin, setIsLogin, userAuthToken, setuserAuthToken, fetchUserProfile } = useContext(Usercontext);
  const [server_otp, setserver_otp] = useState(0);
  const [visiblecontent, setvisiblecontent] = useState('signin');


  //this is used in foregte password 
  const [emailAtForgetpassword, setemailAtForgetpassword] = useState("")

  const [user, setUser] = useState({
    fname: '',
    lname: '',
    password: '',
    email: '',
    number: ''
  })

  useEffect(() => {
    if (isLogin === true) {
      close_authmodal();
    }
  }, [])

  const handle_choosebar_click = (event) => {
    if (event.currentTarget.id == "Authmodal-content-signin-btn") {
      document.getElementById("Authmodal-content-signin-btn").style.backgroundColor = "#ffbd03";
      document.getElementById("Authmodal-content-signup-btn").style.backgroundColor = "white";
      setvisiblecontent("signin");
    } else {
      document.getElementById("Authmodal-content-signin-btn").style.backgroundColor = "white";
      document.getElementById("Authmodal-content-signup-btn").style.backgroundColor = "#ffbd03";
      setvisiblecontent("entermail");
    }
  }

  const close_authmodal = () => {
    props.func();
  }

  const handelChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  //forget password handle fucntion

  const handleForgetPasswordClick = () => {

  }





  // TODO: API calling form here

  //forsignup
  const signIn = async (event) => {
    event.preventDefault();
    var email = document.getElementById("Authmodal-content-signin-form-emailid").value;
    var password = document.getElementById("Authmodal-content-signin-form-password").value;
    try {
      console.log(email, password);
      var res = await axios.post("/authentication/signin", { "email": email, "password": password });
      console.log(res);
      console.log(res.data.success);
      if (res.data.success === true) {
        localStorage.setItem("authToken", res.data.authToken);
        localStorage.setItem("role", res.data.role);
        setuserAuthToken(res.data.authToken);
        close_authmodal();
        setIsLogin(true);

        axios.defaults.headers.authToken = res.data.authToken;

        alert("done")
      } else {
      }
    } catch (error) {
      alert("wrong credential")
      console.log("error occur");
      console.log(error);
    }
  }

  const sendOtpForSignup = async (event) => {
    event.preventDefault();
    var email = document.getElementById("Authmodal-content-signup-enteremail-email").value;
    try {
      var res = await axios.post("/authentication/verifyEmail/signup", { "email": email });
      console.log(res);
      if (res.data.success === true) {
        setserver_otp(res.data.OTP);
        setvisiblecontent("verifyotp");

        setUser({
          ...user,
          "email": email,
        });
      } else {
        alert("enter valid email")
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const verifyOtpForSignup = (event) => {
    console.log("verifyotp caled");
    event.preventDefault();
    var otp = document.getElementById("Authmodal-content-signup-enterotp-otp").value;
    if (server_otp == otp) {
      setvisiblecontent("signup")
    } else {
      alert("wrong otp")
    }
  }

  const signUp = async (event) => {
    console.log("signup called");
    event.preventDefault();
    try {
      var res = await axios.post("/authentication/signup", user);
      if (res.data.success === true) {
        localStorage.setItem('authToken', res.data.authToken);
        localStorage.setItem('role', res.data.role);
        
        axios.defaults.headers.authToken = res.data.authToken;
        setIsLogin(true)
        close_authmodal();

        alert("registered");
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      alert("something went wrong :" + error.response.data.message);
    }
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //forget passwords api
  const sendOtpForForgetPassword = async (event) => {

    event.preventDefault();
    var email = document.getElementById("Authmodal-content-forgetpassword-form-emailid").value;
    try {
      var res = await axios.post("/authentication/verifyEmail/signup", { "email": email });
      console.log(res.data)
      if (res.data.success === true) {
        setserver_otp(res.data.OTP);
        setvisiblecontent("forgetpassword-otpverify");
      } else {
        alert("enter valid email")
      }
    } catch (error) {
      console.log(error.response.data);
    }

    setemailAtForgetpassword(email);

    setvisiblecontent("forgetpassword-otpverify");
  }

  const verifyOtpForForgetPassword = (event) => {
    event.preventDefault();
    var otp = document.getElementById("Authmodal-content-forgetpassword-otpverify-form-otp").value;
    console.log("server otp"+typeof server_otp);
    console.log(" otp"+ typeof otp);
    if (String(server_otp) ==String( otp)) {
      setvisiblecontent("setnewpassword")
    } else {
      alert("wrong otp")
    }
  }

  
  const changePassword =  async (event) => {
    event.preventDefault();
    var password = document.getElementById("Authmodal-content-setnewpassword-form-password").value;
    var confirmpassword = document.getElementById("Authmodal-content-setnewpassword-form-confirmpassword").value;


    if (password === confirmpassword) {
      try {
        var res = await axios.post("/authentication/changePwd", { "email": emailAtForgetpassword,"password":confirmpassword });
        if (res.data.success === true) {
          close_authmodal();
          alert("password chnaged do login now")
        } else {
          alert("enter valid email")
        }
        
      } catch (error) {
        console.log(error);
      }

    } else {
      alert("Password not match")
    }
  }
  

  return (

    <div id="Authmodal-maindiv">

      <div id="Authmodal-contentdiv" name="op" >

        <div id="Authmodal-content-logo" >
          <img src={authlogo}></img>
        </div>
        <div id="Authmodal-content-closebtn" onClick={close_authmodal}>
          <i className="ri-close-line"></i>
        </div>
        <div id="Authmodal-content-choose-bar">
          <div id="Authmodal-content-signin-btn" onClick={handle_choosebar_click}><div>Sign in</div></div>
          <div id="Authmodal-content-signup-btn" onClick={handle_choosebar_click}><div>Sign up</div></div>
        </div>

        {visiblecontent === "signin" && <form id="Authmodal-content-signin-form" className='Authmodal-content-box' onSubmit={signIn}>
          <label >Email id</label>
          <input type="text" id="Authmodal-content-signin-form-emailid" />
          <label >password id</label>
          <input type="password" id="Authmodal-content-signin-form-password" />

          <Link to="#" onClick={() => setvisiblecontent("forgetpassword")}>forget password?</Link>
          <input type="submit" value="Login" />
        </form>}


        {/*forget password contents */}

        {visiblecontent === "forgetpassword" && <form id="Authmodal-content-forgetpassword-form" className='Authmodal-content-box' onSubmit={sendOtpForForgetPassword}>
          <label >Email id</label>
          <input type="text" id="Authmodal-content-forgetpassword-form-emailid" />
          <input type="submit" value="Submit" />
        </form>}

        {visiblecontent === "forgetpassword-otpverify" && <form id="Authmodal-content-forgetpassword-otpverify-form" className='Authmodal-content-box' onSubmit={verifyOtpForForgetPassword}>
          <label >Enter Otp</label>
          <input type="text" id="Authmodal-content-forgetpassword-otpverify-form-otp" />
          <input type="submit" value="Submit" />
        </form>}

        {visiblecontent === "setnewpassword" && <form id="Authmodal-content-setnewpassword-form" className='Authmodal-content-box' onSubmit={changePassword} >
          <label >Enter password</label>
          <input type="text" id="Authmodal-content-setnewpassword-form-password" />
          <label >Enter confirm password</label>
          <input type="text" id="Authmodal-content-setnewpassword-form-confirmpassword" />
          <input type="submit" value="Submit" />
        </form>}


        {/*  */}
        {visiblecontent === "entermail" && <form id="Authmodal-content-signup-signin-form" className='Authmodal-content-box' onSubmit={sendOtpForSignup}>
          <label >Email id</label>
          <input type="text" id="Authmodal-content-signup-enteremail-email" name="fname" onChange={handelChange} />
          <input type="submit" id="Authmodal-content-signup-enteremailform-submitbtn" name="sendotp" onChange={handelChange} />
        </form>}

        {visiblecontent === "verifyotp" &&
          <form id="Authmodal-content-signup-enterotp" className='Authmodal-content-box' name="verifyotp" onSubmit={verifyOtpForSignup}>
            <label >Enter Otp</label>
            <input type="text" id="Authmodal-content-signup-enterotp-otp" name="fname" onChange={handelChange} />
            <input type="submit" id="Authmodal-content-signup-enteremailform-submitbtn" name="verifyotp" />
          </form>
        }

        {visiblecontent === "signup" && <form id="Authmodal-content-signup-form" className="Authmodal-content-box" name="signup" onSubmit={signUp}>
          <label >First name</label>
          <input type="text" id="Authmodal-content-signup-form-firstname" name="fname" onChange={handelChange} />
          <label >Last name</label>
          <input type="text" id="Authmodal-content-signup-form-lastname" name="lname" onChange={handelChange} />
          <label >password</label>
          <input type="password" id="Authmodal-content-signup-form-password" name="password" onChange={handelChange} />
          <label >Phone Number</label>
          <input type="text" id="Authmodal-content-signup-form-mobilenumber" name="number" onChange={handelChange} />
          <input type="submit" id="Authmodal-content-signup-form-submitdiv" />
        </form>}

      </div>


    </div>
  )
}

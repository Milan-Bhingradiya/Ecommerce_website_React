import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import './Navbar.css'


import logo from "../../../../../assets/logo.png"
import { Link } from 'react-router-dom';
import Authmodal from '../../../modal/Authmodal/Authmodal';
import { useNavigate } from "react-router-dom";
import Usercontext from '../../../context/Usercontext';

import "../../../modal/Authmodal/Authmodal.css"

export default function Navbar() {

  const navigator = useNavigate();
  const { isLogin, setIsLogin } = useContext(Usercontext);
  const [is_authmodal_visible, setis_authmodal_visible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsLogin(true);
    }
  }, [])

  const menubtn_onclick = () => {
    console.log("menu click");
    document.getElementById("navbar-mySidenav").style.width = "250px";
  }
  const closeNav = () => {
    console.log("close called");
    document.getElementById("navbar-mySidenav").style.width = "0";
  }

  let isMouseInside = false;
  let isModalOpen = false;

  function showModal() {
    const account_box = document.getElementById("navbar-subdiv3-subsubdiv3");
    const choose_signin_or_up_modal = document.getElementById('navbar-subdiv3-subsubdiv3-dropdownn');
    isModalOpen = true;
    choose_signin_or_up_modal.style.display = 'block';
  }
  function hideModal() {
    const account_box = document.getElementById("navbar-subdiv3-subsubdiv3");
    const choose_signin_or_up_modal = document.getElementById('navbar-subdiv3-subsubdiv3-dropdownn');
    if (!isMouseInside) {
      isModalOpen = false;
      choose_signin_or_up_modal.style.display = 'none';
    }
  }

  const account_box_handel_mouseenter = () => {
    console.log("enterrr");
    isMouseInside = true;
    if (!isLogin) {
      showModal();
    }
  };
  const account_box_handel_mouseleave = () => {
    isMouseInside = false;
    if (!isLogin) {
      setTimeout(hideModal, 200); // Set a small delay to check if the mouse is back inside the box
    }
  }
  const account_box_handel_click = () => {
    if (localStorage.getItem("authToken")) {
      navigator("/myaccountpage")
    }
  }

  const choose_signin_or_up_modal_handel_mouseenter = () => {
    isMouseInside = true;
  }
  const choose_signin_or_up_modal_handel_mouseleave = () => {
    isMouseInside = false;
    if (!isLogin) {
      setTimeout(hideModal, 200); // Set a small delay to check if the mouse is back inside the box
    }
  }

  ///callback method this is send in authmodal for close it
  const open_authmodal_func = () => {
    if (isLogin) {
      console.log("ji");
      navigator("/myaccountpage")
    } else {
      setis_authmodal_visible(true)
    }
  }
  const close_authmodal_func = () => {
    setis_authmodal_visible(false)
  }


 

  return (
    <>
      {is_authmodal_visible ? <Authmodal func={close_authmodal_func} /> : ""}
      <div id="navbar-mySidenav" className="navbar-sidenav">
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
        <Link to="/">Home</Link>
        <a href="/productlist">Earring</a>
        <Link to="/productlist">Rings</Link>
        <a href="#">Pendats</a>
        <a href="#">all jweleery</a>
        <a href="#">Contact us</a>
        <a href="#">About us</a>
      </div>

      {/* // navbar */}
      <div id='navbar-maindiv'>
        <div id="navbar-subdiv0" onClick={menubtn_onclick}>
          <i className="ri-menu-2-line"></i>
        </div>

        <div id="navbar-subdiv1">
          <img src={logo}>
          </img>
        </div>

        <div id="navbar-subdiv2">
          <input type="text" placeholder=' Search for Golf JeWellery Diamond..' />
          <div >
            <i id="navbar-subdiv2-mic" className="ri-mic-line"></i>
            <i id="navbar-subdiv2-search" className="ri-search-line"></i>
          </div>
        </div>

        <div id="navbar-subdiv3">
          <div id="navbar-subdiv3-subsubdiv1" onClick={()=>navigator("/addtocart")}>
            {/* this div containt logo and title  */}
            <div className="navbar-subdiv3-logocontainer">
              {/* <img className="navbar-subdiv3-logo" src={cart}  alt="" /> */}
              <i className="ri-shopping-cart-line navbar-subdiv3-logo" ></i>
              <div>Cart</div>
            </div>
          </div>

          <div id="navbar-subdiv3-subsubdiv2">
            <div className="navbar-subdiv3-logocontainer">
              <i className="ri-heart-line navbar-subdiv3-logo"></i>
              <div>Wishlist</div>
            </div>
          </div>

          <div id="navbar-subdiv3-subsubdiv3" onMouseEnter={account_box_handel_mouseenter} onClick={account_box_handel_click} >
            <div className="navbar-subdiv3-logocontainer" onMouseLeave={account_box_handel_mouseleave}>
              <i className="ri-user-line navbar-subdiv3-logo"></i>
              <div>Account</div>
            </div>
          </div>

          {/* this is code for showing model for chhose sign or signup */}
          <div id="navbar-subdiv3-subsubdiv3-dropdownn" onMouseEnter={choose_signin_or_up_modal_handel_mouseenter} onMouseLeave={choose_signin_or_up_modal_handel_mouseleave}>
            <div id="navbar-subdiv3-subsubdiv3-dropdownn-content">
              <div id="navbar-subdiv3-subsubdiv3-dropdownn-conten-title"><div> Your account </div> </div>
              <div id="navbar-subdiv3-subsubdiv3-dropdownn-conten-desc"><div> You are not cuuretly Login ,If you are new user then sign up or else sign in </div> </div>
              <div id="navbar-subdiv3-subsubdiv3-dropdownn-content-btncontainer">
                <div id="navbar-subdiv3-subsubdiv3-dropdownn-content-signin-signup-btn" onClick={open_authmodal_func} ><div>Sign in / Sign Up</div></div>
              </div>
            </div>
          </div>
          {/* //// */}
        </div>

        {/* <nav className="navbar navbar-expand-lg navbar-light " style={{backgroundColor:"0xjhbbj"}}>
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><hr className="dropdown-divider"/></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav> */}
      </div></>
  )
}



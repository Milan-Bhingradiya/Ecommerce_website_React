import axios from '../../axios';
import React, { useContext, useEffect, useState } from 'react'
import Usercontext from '../../context/Usercontext';
import { useLocation, useNavigate } from 'react-router-dom';
import Orderhistorybox from '../common/Orderhitorybox/Orderhistorybox';

import '../common/Orderhitorybox/Orderhistorybox.css';
let content;


export default function Myaccount() {

    const navigator = useNavigate();

    // for come from success page
    const location = useLocation();


    const { isLogin, setIsLogin } = useContext(Usercontext);
    const [current_item, setcurrent_item] = useState("personalinfo")
    const [orders, setorders] = useState([])
    const [isEditmode, setisEditmode] = useState(false)
    const [userProfile, setuserProfile] = useState({
        fname: '',
        lname: '',
        email: '',
        number: '',
        address: []

    });




 ////////////////////////////////////////////////// API CALL ////////////////////////////////////////////////////////////////////////
    
    const fetchUserProfile = async () => {
        console.log("aa");
        try {
            var res = await axios.get("/customer/getProfile");
            console.log(res.data);
            if (res.data.success === true) {
                // HERE added  "isEditMode_address": false in all obj
                res.data.Customer.address = res.data.Customer.address.map((address) => {
                    return {
                        ...address,
                        "isEditMode_address": false
                    }
                });
                setuserProfile(res.data.Customer)
                // console.log(res.data.Customer.address);
                // console.log(userProfile);

            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateUserProfile = async () => {
        console.log("aa");
        try {
            console.log("final api call");
            console.log(userProfile);
            var res = await axios.patch("/customer/setProfile", { "customer": userProfile });
            if (res.data.success === true) {
                alert("uploaded")
                console.log(res);
            }
        } catch (error) {
            console.log(error.response)
        }
    }



    const getOrder = async () => {
        console.log("get order call");
        try {
            var res = await axios.get("/customer/get/orders");
            if (res.data.success === true) {
                console.log("orders successfully getted");
                console.log(res.data);
                setorders(res.data.orders)

            }
        } catch (error) {
            console.log(error.response)
        }
    }




 ///////////////////////////////////////////////   Handle funciton///////////////////////////////////////////////////////////////////////////

    const personinfo_onclick = () => {
        setcurrent_item("personalinfo");
    }

    const address_onclick = () => {
        setcurrent_item("address");
    }

    const orderhistory_onclick = () => {
        setcurrent_item("orderhistory");
        getOrder();
    }

    const wishlist_onclick = () => {
        setcurrent_item("wishlist");
    }





    //////////////////////////////////////////////////////////// Edit Address  handle function //////////////////////////////////////////////////////////////
    const handleEditOnclick = () => {
        if (isEditmode) {
            //user press save button
            setisEditmode(false);
            updateUserProfile();

        } else {
            setisEditmode(true);
        }
    }

   
    const handleAddressEditOnclick = (id) => {

        const updatedAddress = userProfile.address.map((address) => {

            if (address._id === id) {
                
                if (address.isEditMode_address) {
                    updateUserProfile();
                }
                return {
                    ...address,
                    isEditMode_address: !address.isEditMode_address
                }

            } else {
                return address
            }

        })

        // imp
        setuserProfile((prevUserProfile) => {
            return {
                ...prevUserProfile,
                "address": updatedAddress
            }

        })
    }

    /////////////////////////////////////////////////////// handle address input value value chnage///////////////////////////////////////////////////////////////////


    const handleInputTypeOnChange = (e) => {
        setuserProfile({ ...userProfile, [e.target.name]: e.target.value })
    }
    const handleAddressInputTypeOnChange = (e, id) => {
        console.log("address chnage");


        var updatedAddress = userProfile.address.map((address) => {
            return address._id === id ? { ...address, [e.target.name]: e.target.value } : address
        })

        setuserProfile({ ...userProfile, "address": updatedAddress })
        console.log(userProfile);
    }




    useEffect(() => {
        console.log("useefect of myaccountpage");
        fetchUserProfile()
        console.log("xxxxxxxxxxx");
        
        // for come from success page
        var sectionname = null;
        sectionname = location.state ? location.state.sectionname : null;

        if (sectionname == "orderhistory") {
            orderhistory_onclick();
        }
    }, [])




    const logout = () => {
        localStorage.removeItem("authToken")
        localStorage.removeItem("role")
        setIsLogin(false)
        navigator("/")
    }



    const formatDate = (datestring) => {
        const date = new Date(datestring);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            // timeZoneName: 'short'
        };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate;
    }



    return (
        <>
            <div id="myaccount-headingdiv">
                <div id="myaccount-heading-leftdiv">My account </div>
                <div id="myaccount-heading-rightdiv" onClick={logout}><div>
                    LogOut
                </div>  </div>
            </div>

            <div id="myaccount-maindiv">

                <div id="myaccount-leftsubdiv">
                    <div id="myaccount-leftsubdiv-personalinfo-div" style={current_item === "personalinfo" ? { backgroundColor: "#F2E9E9" } : { backgroundColor: "white" }} className='myaccount-leftsubdiv-subdives' onClick={personinfo_onclick}>
                        <div>Persnol information</div>
                    </div>

                    <div id="myaccount-leftsubdiv-address-div" style={current_item === "address" ? { backgroundColor: "#F2E9E9" } : { backgroundColor: "white" }} className='myaccount-leftsubdiv-subdives' onClick={address_onclick}>
                        <div>Address</div>
                    </div>

                    <div id="myaccount-leftsubdiv-orderhistory-div" style={current_item === "orderhistory" ? { backgroundColor: "#F2E9E9" } : { backgroundColor: "white" }} className='myaccount-leftsubdiv-subdives' onClick={orderhistory_onclick}>
                        <div>Order history</div>
                    </div>

                    <div id="myaccount-leftsubdiv-wishlist-div" style={current_item === "wishlist" ? { backgroundColor: "#F2E9E9" } : { backgroundColor: "white" }} className='myaccount-leftsubdiv-subdives' onClick={wishlist_onclick}>
                        <div>wishlist</div>
                    </div>
                </div>


                {/* right side part */}


                <div id="myaccount-rightsubdiv">
          
                    {current_item === "personalinfo" && <div id="myaccount-rightsubdiv-personalinfo-maindiv" className='margin3'>
                        <h3>Personal Information </h3>
                        <div id="myaccount-rightsubdiv-personalinfo-box">
                            <div id="myaccount-rightsubdiv-personalinfo-box-heading" className='myaccount-rightsubdiv-box-heading' >
                                <div>Personal Information</div>
                                <div onClick={handleEditOnclick}>{isEditmode ? "Save" : "Edit"}</div>
                            </div>
                            <div id="myaccount-rightsubdiv-personalinfo-box-detail" className='myaccount-rightsubdiv-box-detail'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>first name</td>
                                            <td >:</td>
                                            {isEditmode ? <td><input type='text' value={userProfile.fname} onChange={handleInputTypeOnChange} name="fname"></input></td> : <td>{userProfile.fname}</td>}
                                        </tr>
                                        <tr>
                                            <td>last name</td>
                                            <td >:</td>
                                            {isEditmode ? <td><input type='text' value={userProfile.lname} onChange={handleInputTypeOnChange} name="lname"></input></td> : <td>{userProfile.lname}</td>}
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>:</td>
                                            {isEditmode ? <td><input type='text' value={userProfile.email} onChange={handleInputTypeOnChange} name="email"></input></td> : <td>{userProfile.email}</td>}
                                        </tr>
                                        <tr>
                                            <td>number</td>
                                            <td>:</td>
                                            {isEditmode ? <td> <input type='text' value={userProfile.number} onChange={handleInputTypeOnChange} name="number"></input></td> : <td>{userProfile.number}</td>}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>}



                    {current_item === "address" && <div id="myaccount-rightsubdiv-address-maindiv" className='margin3'>
                        <h3>Address </h3>

                        {userProfile.address.map((address) => {
                            return <div id="myaccount-rightsubdiv-address-box">
                                <div id="myaccount-rightsubdiv-address-box-heading" className='myaccount-rightsubdiv-box-heading'>
                                    <div>Address</div>
                                    <div onClick={() => handleAddressEditOnclick(address._id)}>{isEditmode ? "Save" : "Edit"}</div>
                                </div>
                                <div id="myaccount-rightsubdiv-address-box-detail" className='myaccount-rightsubdiv-box-detail' >

                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>full address</td>
                                                <td>:</td>
                                                {address.isEditMode_address ? <td><textarea value={address.fulladdress ? address.fulladdress : ""} onChange={(e) => handleAddressInputTypeOnChange(e, address._id)} name="fulladdress"  ></textarea></td> : <td>{address.fulladdress ? address.fulladdress : ""}</td>}
                                            </tr>

                                            <tr>
                                                <td>pincode</td>
                                                <td>:</td>
                                                {address.isEditMode_address ? <td><input type='number' value={address.pincode ? address.pincode : ""} onChange={(e) => handleAddressInputTypeOnChange(e, address._id)} name="pincode"  ></input></td> : <td>{address.pincode ? address.pincode : ""}</td>}
                                            </tr>

                                            <tr>
                                                <td>city</td>
                                                <td>:</td>
                                                {address.isEditMode_address ? <td><input type='text' value={address.city ? address.city : ""} onChange={(e) => handleAddressInputTypeOnChange(e, address._id)} name="city"  ></input></td> : <td>{address.city ? address.city : ""}</td>}
                                            </tr>

                                            <tr>
                                                <td>state</td>
                                                <td>:</td>
                                                {address.isEditMode_address ? <td><input type='text' value={address.state ? address.state : ""} onChange={(e) => handleAddressInputTypeOnChange(e, address._id)} name="state"  ></input></td> : <td>{address.state ? address.state : ""}</td>}
                                            </tr>

                                            <tr>
                                                <td>country</td>
                                                <td>:</td>
                                                {address.isEditMode_address  ? <td><input type='text' value={address.country ? address.country : ""} onChange={(e) => handleAddressInputTypeOnChange(e, address._id)} name="country"  ></input></td> : <td>{address.country ? address.country : ""}</td>}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>




                        })}
                    </div>}



                    {/* // this look complex : watch json will solve complexity.... */}
                    {current_item === "orderhistory" && <div id="myaccount-rightsubdiv-orderhistory-maindiv" className='margin3'>
                        <h3>Order history </h3>
                        {console.log(orders)}
                        {orders && orders.map((order) => {
                            return <div style={{ margin: "15px" }} >
                                <div style={{ margin: "6px" }}>you order this items at {formatDate(order.createdAt)}</div>
                                {order.products.map((products) => {
                                    return <Orderhistorybox img={`${import.meta.env.VITE_BACKEND_URL}${products.product.images[0]}`} name={products.product.name} metal={products.metal} size={products.size} price={products.product.price} quantity={products.product.quantity} />
                                })}
                                
                                </div>
                        })}
                    </div>}


                    {current_item === "wishlist" && <div id="myaccount-rightsubdiv-wishlist-maindiv" className='margin3'>
                        <h3>wishlist </h3>
                        <div id="myaccount-rightsubdiv-wishlist-box">
                            <div id="myaccount-rightsubdiv-wishlist-box-heading" className='myaccount-rightsubdiv-box-heading'>
                                <div>wishlist</div>
                            </div>
                            <div id="myaccount-rightsubdiv-wishlist-box-detail" className='myaccount-rightsubdiv-box-detail' >
                                <table>
                                    <tr>
                                        <td>Title</td>
                                        <td>:</td>
                                        <td>am,snamsn</td>
                                    </tr>
                                    <tr>
                                        <td>Title</td>
                                        <td>:</td>
                                        <td>am,snamsn</td>
                                    </tr>
                                    <tr>
                                        <td>Title</td>
                                        <td>:</td>
                                        <td>am,snamsn</td>
                                    </tr>
                                    <tr>
                                        <td>Title</td>
                                        <td>:</td>
                                        <td>am,snamsn</td>
                                    </tr>
                                    <tr>
                                        <td>Title</td>
                                        <td>:</td>
                                        <td>am,snamsn</td>
                                    </tr>
                                    <tr>
                                        <td>Title</td>
                                        <td>:</td>
                                        <td>am,snamsn</td>
                                    </tr>
                                </table>
                            </div>

                        </div>

                    </div>}


                </div>
            </div>
        </>
    )
}

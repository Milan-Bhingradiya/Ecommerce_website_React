import axios from '../axios';
import React, { useContext, useEffect, useState } from 'react'
import Usercontext from '../context/Usercontext';
import { useNavigate } from 'react-router-dom';

export default function Success() {

  const { showToast } = useContext(Usercontext)
  const [orderplaced, setorderplaced] = useState(false)

  const placeorder = async () => {
    var placeOrderData = localStorage.getItem('placeOrderData');
    var placeOrderDataobj = JSON.parse(placeOrderData);

    if (placeOrderData) {
      try {


        var res = await axios.post(`/customer/placeOrder`, placeOrderDataobj);

        if (res.data.success === true) {
          localStorage.removeItem('placeOrderData');
          console.log(res.data);
          setorderplaced(true)
        } else {

          setorderplaced(false)
          alert("something went wrong");
        }

      } catch (error) {
        setorderplaced(false)
        console.log(error.response);
        alert("something went wrongm :" + error.message);
      }

    }

  }

  useEffect(() => {
    placeorder();
  }, [])

  const navigator = useNavigate()
  const handleSucessBtnonclick = () => {
    const data = {
      sectionname: "orderhistory"
    };
    navigator("/myaccountpage", { state: data })

  }

  return (
    <div id="success-maindiv">

      <div id="success-subdiv">
        {orderplaced === true ?
          <> <div id="succcess-subdiv-icondiv" style={{ border: "2px solid green" }}>
            <div id="succcess-subdiv-icon">✔</div>
            <div id="succcess-subdiv-iconname">Success</div>
          </div>


            <div id="success-subdiv-desc">Your Order has beeen Registerd Succesfully.You will Get Your Product soon...</div>
            <div id="success-subdiv-btn" onClick={() => handleSucessBtnonclick()}> <div>GO to Order History</div></div>
          </> : <> <div id="succcess-subdiv-icondiv" style={{ border: "2px solid red" }}>
            <div id="succcess-subdiv-icon">❌</div>
            <div id="succcess-subdiv-iconname" >Order Failed</div>
          </div>


            <div id="success-subdiv-desc">Your Order has beeen not Succesfully Registered.If your money is debited Then contect us fast</div></>}

      </div>


    </div>
  )
}

import React from 'react'

export default function Orderhistorybox(props) {
    return (

       <>

       <div id="orderhistorybox-heading"><div>{props.date}</div></div>
         <div id="orderhistorybox-maindiv">

<div id="orderhistorybox-subdiv1">
    <img src={props.img} alt="" />
</div>

<div id="orderhistorybox-subdiv2">
    <div className="orderhistorybox-subdiv2-name">{props.name}</div>
    <div className="orderhistorybox-subdiv2-price"> ₹{props.price}</div>
    <div className="orderhistorybox-subdiv2-size"><span>Size : </span>{props.size}</div>
    <div className="orderhistorybox-subdiv2-metal"><span>Metal : </span>{props.metal}</div>
</div>

</div>
       </>
    )
}

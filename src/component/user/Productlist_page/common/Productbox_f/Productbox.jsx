import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Usercontext from '../../../context/Usercontext'; 

export default function Productbox(props) {

  const { productindex, } = useContext(Usercontext);

  
  const navigator = useNavigate();

  
  const explore_onclick = (id) => {
    navigator(`/productpage/${id}`)
  }

  return (
    <div id="productbox-maindiv">
      <div id="productbox-subdiv1">
        {/* <img src="https://picsum.photos/200"></img> */}
        {import.meta.env.VITE_BACKEND_URL+props.img}
        <img src={`${import.meta.env.VITE_BACKEND_URL}${props.img}`}></img>
        
      </div>
      <div id="productbox-subdiv2">
        <p id="productbox-subdiv2-title">{props.name}</p>
        <p id="productbox-subdiv2-price">{props.price}</p>
        <p id="productbox-subdiv2-category">{props.category+" | "+props.subcategory}</p>
        <div id="productbox-subdiv2-btn" onClick={()=>explore_onclick(props.id)}><p>Explore Now</p></div>
      </div>
    </div>
  )
}

import React, { useContext, useEffect, useState } from 'react'
import Productbox from '../../common/Productbox_f/Productbox'
import "../../common/Productbox_f/Productbox.css"
import axios from './../../../axios.jsx'
import Usercontext from '../../../context/Usercontext'
import { useParams } from 'react-router-dom'
export default function Productbox_container() {

  const { selectedSubCategory, selectedTags, selectedMetal, category, allproduct, fetchproducts } = useContext(Usercontext);

  const { name } = useParams();


  useEffect(() => {
    console.log("useeffect of product box container calleddd");
    console.log("xxxxxxx" + category);
    // fetchproducts(`category=${category}&subcategory=${selectedSubCategory}&tags=${selectedTags}&metal=${selectedMetal}`);
    fetchproducts(`category=${category}&subcategory=${selectedSubCategory}`);


    //TODO:  aya aa api call nathi karvani
    // fetchproducts(`category=${name}`);

  }, [category, selectedSubCategory, selectedTags, selectedMetal])


  var i = 0;
  return (
    <>
      <h1>{allproduct.length}</h1>
      <div id="productbox-container-maindiv">
        {allproduct.length !== 0 ? allproduct.map((product) => {
          return <Productbox key={product._id} id={product._id} index={i++} img={product.images[0]} name={product.name} description={product.description} price={product.price} category={product.category} subcategory={product.subcategory} />
        }) : <h1>na data found </h1>}
      </div>
    </>
  )
}

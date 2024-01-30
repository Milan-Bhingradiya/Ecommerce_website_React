import React, { useEffect } from 'react'
import Product_img from '../../component/section1/Product_img_f/Product_img'
import Product_desc from '../../component/section1/Product_desc_rightside_f/Product_desc_rightside'


import "../../component/section1/Product_img_f/Product_img.css";
import "../../component/section1/Product_desc_rightside_f/Product_desc_rightside.css";
import axios from '../../../axios';
import { useParams } from 'react-router-dom';


export default function Product_container() {

  return (<>
    <div id="product-container-maindiv">
      <Product_img />
      <Product_desc />
    </div>
  </>
  )
}

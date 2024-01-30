import React, { useState } from 'react'
import Product_detail from '../../component/section2/Product_detail_f/Product_detail'
import Product_additional_detail from '../../component/section2/Product_additional_detail_f/Product_additional_detail'


import "../../component/section2/Product_detail_f/Product_detail.css"
import "../../component/section2/Product_additional_detail_f/Product_additional_detail.css"
import "../../component/section2/Product_tags_f/Product_tags.css"

import Product_tags from '../../component/section2/Product_tags_f/Product_tags'


export default function Product_detail_container() {

  const [detail_or_additiondetail, setdetail_or_additiondetail] = useState(false);

  const show_detail_box = () => {
    setdetail_or_additiondetail(true)
  }

  const show_additionaldetail_box = () => {
    setdetail_or_additiondetail(false)
  }


  return (
    <div id="product-detail-container">


      <div id="product-detail-container-navbar">

        <div id="product-detail-container-navbar-item" onClick={show_detail_box} >
          <div className={detail_or_additiondetail ? "brownfont" : "blackfont"} >Details</div>
        </div>
        <div id="product-detail-container-navbar-item" onClick={show_additionaldetail_box} >
          <div className={detail_or_additiondetail ? "blackfont" : "brownfont"}>Adiitional Details</div>
        </div>

      </div>
      {detail_or_additiondetail ? <Product_detail /> : <Product_additional_detail />}
      <Product_tags />

    </div>
  )
}

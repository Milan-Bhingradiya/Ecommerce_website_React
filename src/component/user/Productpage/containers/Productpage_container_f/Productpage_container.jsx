import React from 'react'
import Product_container from '../Product_container_f/Product_container'


import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "../Product_container_f/Product_container.css"
import Productlist_page_container from '../../../Productlist_page/containers/Productlist_page_container_f/Productlist_page_container';
import Product_detail_container from '../Product_detail_container_f/Product_detail_container';

import "../Product_detail_container_f/Product_detail_container.css"

export default function Productpage_container() {
    return (
        <div>
            <Product_container />    
            <Product_detail_container/>     
        </div>
    )
}

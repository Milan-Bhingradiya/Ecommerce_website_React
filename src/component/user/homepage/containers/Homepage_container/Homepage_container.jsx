import '../../../global/component/Navbar_f/Navbar.css'
import '../../../global/component/Navbar2_f/Navbar2.css'
import '../../Slider_f/Slider.css'
import '../../common/Heading_f/Heading.css'
import "../../common/Categorybox_f/Categorybox.css"
import "../../containers/Categorybox_container_f/Categorybox_container.css"
import "../../common/Explorenewitem_box_f/Explorenewitem_box.css"
import "../../containers/Explorenewitem_box_container_f/Explorenewitem_box_container.css"
import "../../containers/Footer_container_f/Footer_container.css"
import "../../common/Footerbox_f/Footerbox.css"


import React from 'react'
import Heading from '../../common/Heading_f/Heading'
import Categorybox_container from '../Categorybox_container_f/Categorybox_container'
import Explorenewitem_box_container from '../Explorenewitem_box_container_f/Explorenewitem_box_container'
import Footer_container from '../Footer_container_f/Footer_container'

import   {BrowserRouter,Route,Routes} from 'react-router-dom';
import Slider from '../../Slider_f/Slider'
import Review_box_container from '../Review_box_container_f/Review_box_container'

import  '../Review_box_container_f/Review_box_container.css'
export default function Homepage_container() {
  return (
    <Routes>
          <Route exact path="/" element={
            <>
              <Slider />
              <Heading title={"Shop by category"} desc={"Browse through your favorite categories. We've got them all!."} />
              <Categorybox_container />
              <Heading title={"New for You"} desc={"Unveiling stunning jewelry, just arrived"} />
              <Explorenewitem_box_container/>
              <Heading title={"Some of our Customer review "} desc={"Unveiling stunning jewelry, just arrived"} />
             <Review_box_container/>
            </>
          }>

          </Route>
        </Routes>
  )
}

import '../../Filterbar_f/Filterbar.css'


import '../Productbox_container_f/Productbox_container.css'

import React from 'react'
import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import Filterbar from '../../Filterbar_f/Filterbar'




import Productbox_container from '../Productbox_container_f/Productbox_container'
export default function Productlist_page_container() {

  return (
    <>
      <Filterbar />
      <Productbox_container />
    </>
  )
}

import React from 'react'
import Explorenewitem_box from '../../common/Explorenewitem_box_f/Explorenewitem_box';
import explore1 from "../../../../../assets/explore1.png"
import explore2 from "../../../../../assets/explore2.png"
import explore3 from "../../../../../assets/explore3.png"
export default function Explorenewitem_box_container() {
  return (
    <div id="explorenewitem_box_containe">
        <Explorenewitem_box  img={explore1}/>
        <Explorenewitem_box img={explore2}/>
        <Explorenewitem_box img={explore3}/>
    </div>
  )
}

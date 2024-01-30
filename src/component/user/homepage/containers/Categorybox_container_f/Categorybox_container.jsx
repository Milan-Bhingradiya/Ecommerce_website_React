import React from 'react'
import Categorybox from '../../common/Categorybox_f/Categorybox'

import ring from "../../../../../assets/homepage/ring.png"
import pendant from "../../../../../assets/homepage/pendant.png"
import earring from "../../../../../assets/homepage/earring.png"
import necklace from "../../../../../assets/homepage/necklace.png"
export default function Categorybox_container() {
  return (
   <>
<div id="categorybox_container-maindiv">
    <Categorybox  img={ring}  name={"Rings"}/>
    <Categorybox  img={pendant}  name={"Pendant"}/>
    <Categorybox  img={earring} name={"Rarrings"} />
    <Categorybox  img={necklace} name={"Necklace"} />


</div>
   
   </>
  )
}

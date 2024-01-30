import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Usercontext from '../../../context/Usercontext';


export default function Navbar2() {
  

const {setcategory} = useContext(Usercontext)

  const home_onclick = () => {

    console.log("called");
    navigator("/")

  }
  const rings_onclick = () => {
    console.log("called");
    navigator("/productlist/ring")
    setcategory("Ring")
  }
  const necklace_onclick = () => {
    navigator("/productlist/necklace")
    setcategory("Necklace")
   
  }
  const earrings_onclick = () => {
    navigator("/productlist/earring")
    setcategory("Earrings")
  }

  const contact_onclick = () => {
    console.log("called");
    navigator("/productpage")
  }
  const navigator = useNavigate();
  return (
    <div id="navbar2-maindiv" >

      <div className="navbar2-item" onClick={
        home_onclick

      }>
        <p>Home</p>
      </div>

      <div className="navbar2-item" onClick={earrings_onclick}>
        <p>Earring</p>
      </div>

      <div className="navbar2-item" onClick={rings_onclick}>
        <p>Rings</p>
      </div>

      <div className="navbar2-item" onClick={necklace_onclick}>
        <p>necklace</p>
      </div>

      <div className="navbar2-item">
        <p>All JeWellery</p>
      </div>

      <div className="navbar2-item">
        <p>Contact us</p>
      </div>

      <div className="navbar2-item">
        <p>About us</p>
      </div>


    </div>
  )
}

import React from 'react'
import ring from "../../../../assets/ring1.jpg"
import ring2 from "../../../../assets/ring2.jpg"
import one from "../../../../assets/one.png"
var person="https://www.heraldnews.com/gcdn/authoring/2018/09/06/NHER/ghows-WL-752d9023-d2ae-5b53-e053-0100007f5256-124b2674.jpeg";
export default function Slider() {
  return (
    <div id="slider-maindiv">

        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000">
      <img src={one} className="d-block " alt=".../"/>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src={ring2} className="d-block   " alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={ring} className="d-block " alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
 
  </button>
</div>

    </div>
  )
}

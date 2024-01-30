import React, { useEffect } from 'react'
import Reviewbox from '../../common/Reviewbox_f/Reviewbox'
import '../../common/Reviewbox_f/Reviewbox.css'

export default function Review_box_container() {

// const next=()=>{
//   console.log("next");
//   const reviewBoxContainer = document.getElementById('review-box-container-subdiv1');
//   reviewBoxContainer.scrollLeft = reviewBoxContainer.scrollLeft +500;
// }
const next = () => {
  const reviewBoxContainer = document.getElementById('review-box-container-subdiv1');
  const scrollAmount = 500;
  const currentScrollPosition = reviewBoxContainer.scrollLeft;
  const targetScrollPosition = currentScrollPosition + scrollAmount;
  
  // Apply smooth scrolling using CSS transition
  reviewBoxContainer.style.transition = 'scroll-right 0.3s ease-in-out';
  reviewBoxContainer.scrollLeft = targetScrollPosition;

  // Remove the transition after it completes to avoid affecting future scrolling
  reviewBoxContainer.addEventListener('transitionend', () => {
    reviewBoxContainer.style.transition = '';
  });
};

// useEffect(() => {

//   const reviewBoxContainer = document.getElementById('review-box-container-maindiv');
// const prevButton = document.getElementById('review-box-container-subdiv2-prev-btn');
// const nextButton = document.getElementById('review-box-container-subdiv2-next-btn');
// let currentIndex = 0;

// prevButton.addEventListener('click', () => {
//     if (currentIndex > 0) {
//         currentIndex--;
//         updateReviewBoxPosition();
//     }
// });

// nextButton.addEventListener('click', () => {
//     if (currentIndex < reviewBoxContainer.children.length - 1) {
//         currentIndex++;
//         updateReviewBoxPosition();
//     }
// });

// function updateReviewBoxPosition() {
//     const offset = -currentIndex * reviewBoxContainer.offsetWidth;
//     reviewBoxContainer.style.transform = `translateX(${offset}px)`;
// }
// })


  return (
    <>
      <div id="review-box-container-maindiv">

        {/* <div id="review-box-container-subdiv1">
          <Reviewbox />
          <Reviewbox />
          <Reviewbox />
          <Reviewbox />
          <Reviewbox />
          <Reviewbox />
        </div>

        <div id="review-box-container-subdiv2">
          <div id="review-box-container-subdiv2-arrows">
            <div id="review-box-container-subdiv2-prev-btn" onClick={next}>&lt; Prev</div>
            <div id="review-box-container-subdiv2-next-btn" onClick={next}> &gt;</div>
          </div>
        </div>
 */}

<div id="carouselExampleControls" class="carousel slide text-center carousel-dark" data-mdb-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="rounded-circle shadow-1-strong mb-4"
        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar"
        style={{width: "150px"}} />
      <div class="row d-flex justify-content-center">
        <div class="col-lg-8">
          <h5 class="mb-3">Maria Kate</h5>
          <p>Photographer</p>
          <p class="text-muted">
            <i class="fas fa-quote-left pe-2"></i>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti
            nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia
            fugit consequatur laudantium velit magnam error. Consectetur distinctio fugit
            doloremque.
          </p>
        </div>
      </div>
      <ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
        <li><i class="fas fa-star fa-sm"></i></li>
        <li><i class="fas fa-star fa-sm"></i></li>
        <li><i class="fas fa-star fa-sm"></i></li>
        <li><i class="fas fa-star fa-sm"></i></li>
        <li><i class="far fa-star fa-sm"></i></li>
      </ul>
    </div>

    {/* //////////////// */}
    <div class="carousel-item">
      <img class="rounded-circle shadow-1-strong mb-4"
        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp" alt="avatar"
        style={{width: "150px"}} />
      <div class="row d-flex justify-content-center">
        <div class="col-lg-8">
          <h5 class="mb-3">John Doe</h5>
          <p>Web Developer</p>
          <p class="text-muted">
            <i class="fas fa-quote-left pe-2"></i>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti
            nesciunt sint eligendi reprehenderit reiciendis.
          </p>
        </div>
      </div>
      <ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
        <li><i class="fas fa-star fa-sm"></i></li>
        <li><i class="fas fa-star fa-sm"></i></li>
        <li><i class="fas fa-star fa-sm"></i></li>
        <li><i class="fas fa-star fa-sm"></i></li>
        <li><i class="far fa-star fa-sm"></i></li>
      </ul>
    </div>



    {/* ////////////////// */}
    <div class="carousel-item">
      <img class="rounded-circle shadow-1-strong mb-4"
        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp" alt="avatar"    style={{width: "150px"}} />
      <div class="row d-flex justify-content-center">
        <div class="col-lg-8">
          <h5 class="mb-3">Anna Deynah</h5>
          <p>UX Designer</p>
          <p class="text-muted">
            <i class="fas fa-quote-left pe-2"></i>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti
            nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia
            fugit consequatur laudantium velit magnam error. Consectetur distinctio fugit
            doloremque.
          </p>
        </div>
      </div>
      <ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
        <li><i class="fas fa-star fa-sm"></i></li>
        <li><i class="fas fa-star fa-sm"></i></li>
        <li><i class="fas fa-star fa-sm"></i></li>
        <li><i class="fas fa-star fa-sm"></i></li>
        <li><i class="far fa-star fa-sm"></i></li>
      </ul>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-mdb-target="#carouselExampleControls"
    data-mdb-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-mdb-target="#carouselExampleControls"
    data-mdb-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>


      </div>


    </>
  )
}

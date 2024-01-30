import logo from './logo.svg';
import './App.css';

import Slider from './component/user/homepage/Slider_f/Slider';
import Heading from './component/user/homepage/common/Heading_f/Heading';
import Categorybox_container from './component/user/homepage/containers/Categorybox_container_f/Categorybox_container';
import Explorenewitem_box_container from './component/user/homepage/containers/Explorenewitem_box_container_f/Explorenewitem_box_container';
import Footer_container from './component/user/homepage/containers/Footer_container_f/Footer_container';




import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage_container from './component/user/homepage/containers/Homepage_container/Homepage_container';
import Productlist_page_container from './component/user/Productlist_page/containers/Productlist_page_container_f/Productlist_page_container';
import Productpage_container from './component/user/Productpage/containers/Productpage_container_f/Productpage_container';
import Myaccount_page_container_f from './component/user/Myaccountpage/containers/Myaccount_page_container_f';
import Cartpage_container from './component/user/Cartpage/containers/Cartpage_container_f/Cartpage_container';



//for toast

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Success from './component/user/Successpage/Success';
import './component/user/Successpage/Success.css';
import Navbar_container from './component/user/global/containers/Navbar_container/Navbar_container';
import Mainpage from './component/Merchant/MainPage/Mainpage';
import Userdata from './component/user/context/Userdata';
import Merchantdata from './component/Merchant/context/Merchantdata';


function App() {
  return (
    <>
      <BrowserRouter>
        <Userdata>

          <Navbar_container />
          <Routes>
            <Route exact path="/" element={<Homepage_container />}></Route>
            <Route exact path="/productlist/:name" element={<Productlist_page_container />}></Route>
            <Route exact path="/productpage/:id" element={<Productpage_container />}></Route>
            <Route exact path="/myaccountpage" element={<Myaccount_page_container_f />}></Route>
            <Route exact path="/addtocart" element={<Cartpage_container />}></Route>
            <Route exact path="/success" element={<Success />}></Route>
          </Routes>
        </Userdata>
        <Merchantdata>

          <Routes>
            <Route exact path="/admin" element={<Mainpage />}></Route>
          </Routes>
        </Merchantdata>

        <Footer_container />
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>

    </>
  );
}

export default App;

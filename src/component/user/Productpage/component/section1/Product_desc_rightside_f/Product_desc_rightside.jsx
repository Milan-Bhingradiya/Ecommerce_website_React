import React, { useContext, useEffect, useState } from 'react'
import Usercontext from '../../../../context/Usercontext'
import { useParams } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import axios from '../../../../axios';

export default function Product_desc() {

    const { id } = useParams();

    const { oneProduct, showToast } = useContext(Usercontext);

    const [selectedMetal, setselectedMetal] = useState("")
    const [selectedMetalPrice, setselectedMetalPrice] = useState(0)

    const handleMetalonClick = (metalname, metalprice) => {
        setselectedMetal(metalname);
        setselectedMetalPrice(metalprice)
    }

    //addproduct into cart  api call
    const updateCart = async (product) => {
        var data = {
            "cart": [
                {
                    "product": product._id,
                    "metal": selectedMetal,
                    "price":selectedMetalPrice,
                    "quantity":1,
                    "size": "8"
                }]
        }
        try {
            var res = await axios.patch(`/customer/add/cart`, data);
            console.log(res.data);
            if (res.data.success) {
                showToast("Added to Cart");
            } else {

            }
        } catch (error) {
        }
    }

    useEffect(() => {
        // console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
        setselectedMetal(oneProduct && oneProduct.metal && Object.keys(oneProduct.metal)[0]);
        setselectedMetalPrice(oneProduct && oneProduct.metal && Object.values(oneProduct.metal)[0])
    }, [oneProduct])


    return (
        <>
            {/* {oneProduct && console.log(oneProduct.metal)} */}

            <div id="product-desc-rightside-maindiv">
                <div id="product-titlediv">
                    {oneProduct && oneProduct.name}
                </div>

                <div id="product-descdiv">
                    {oneProduct && oneProduct.description}
                </div>

                <div id="product-pricediv">
                    {selectedMetalPrice}
                </div>


                <div id="product-incallinfo-div">
                    Incl. Of All Taxes
                </div>

                <div id="product-instockdiv">
                    <p>In Stock</p>
                </div>

                <div id="product-choosesize-choosemetal-containerdiv">

                    <div id="product-choosesize-div">
                        {/* left */}
                        <div className="product-choosesize-div-leftsubdiv" >
                            Size
                        </div>
                        {/* right */}
                        <div className="product-choosesize-div-rightsubdiv" >
                            {/* this is box that intialyy show  */}
                            <div className="product-choosesize-div-rightsubdiv-firstdiv">
                                <p>select size</p>
                            </div>
                            {/* dropdown box  */}
                            <div className="product-choosesize-div-rightsubdiv-dropdown">
                                <div className="product-choosesize-div-rightsubdiv-dropdown-content">19mm</div>
                                <div className="product-choosesize-div-rightsubdiv-dropdown-content">11mm</div>
                                <div className="product-choosesize-div-rightsubdiv-dropdown-content">11mm</div>
                                <div className="product-choosesize-div-rightsubdiv-dropdown-content">11mm</div>
                                <div className="product-choosesize-div-rightsubdiv-dropdown-content">11mm</div>
                            </div>
                        </div>
                    </div>

                    {/* for chhose metal i dont write css again, used selectsize class(css) for also select metal */}
                    <div id="product-choose-metaldiv">
                        {/* left */}
                        <div className="product-choosesize-div-leftsubdiv" >
                            Metal
                        </div>
                        {/* right */}
                        <div className="product-choosesize-div-rightsubdiv" >
                            {/* this is box that intialyy show  */}
                            <div className="product-choosesize-div-rightsubdiv-firstdiv">
                                <p> {selectedMetal}</p>
                            </div>
                            {/* dropdown box  */}
                            <div className="product-choosesize-div-rightsubdiv-dropdown">
                                {/* i asign metalname and price aonclick func...// quite diffrent becuase here metal is obj not array  */}
                                {oneProduct && oneProduct.metal &&Object.entries(oneProduct.metal).map((metalname) => {
                                    return <div className="product-choosesize-div-rightsubdiv-dropdown-content" id={metalname[0]} onClick={() => { handleMetalonClick(metalname[0], metalname[1]) }} >{metalname[0]}</div>
                                })}

                            </div>
                        </div>
                    </div>
                </div>
                {/* /////////////////     select size and metal over   //////////////////////// */}

                <div id="product-btn-container">

                    <div id="product-shopnow-div" onClick={() => { updateCart(oneProduct) }}>
                        <div >Add to cart</div>
                    </div>

                    <div id="product-addtocart-div">
                        <div>Shop Now</div>
                    </div>
                </div>


            </div>


        </>
    )
}

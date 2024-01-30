import axios from '../../axios';
import { useContext, useEffect, useState } from 'react'
import Usercontext from '../../context/Usercontext';

export default function Cart() {

    const { showToast } = useContext(Usercontext)
    const [num, setnum] = useState(0)

    const [selectedCartItemsIds, setselectedCartItemsIds] = useState([]);
    const [totalAmount, settotalAmount] = useState(0);
    const [products, setproducts] = useState([
    ]);

    // {
    //     "success": true,
    //     "cart": [
    //         {
    //             "product": {
    //                 "_id": "64cd41aed592bfa8c343244a",
    //                 "name": "14K Rose Gold Diamond Cluster Stud Earrings .25CTW",
    //                 "description": "These gorgeous diamond stud earrings are the perfect earring for any occasion. The elegant design of these cluster earrings will catch the light at your every move. Made in your choice of 14K white, yellow or rose gold. Screw back posts provide security and comfort for all day wear.",
    //                 "price": 7000,
    //                 "images": [
    //                     "https://a.1stdibscdn.com/love-knot-earrings-in-yellow-gold-w-triple-knot-11-millimeters-for-sale/1121189/j_124374121625890476956/12437412_master.jpg?disable=upscale&auto=webp&quality=60&width=1400",
    //                     "https://a.1stdibscdn.com/love-knot-earrings-in-yellow-gold-w-triple-knot-11-millimeters-for-sale-picture-2/j_16051/j_124374121622653744225/IMG_6710_master.jpg?disable=upscale&auto=webp&quality=60&width=610",
    //                     "https://a.1stdibscdn.com/love-knot-earrings-in-yellow-gold-w-triple-knot-11-millimeters-for-sale/1121189/j_124374121625890476956/12437412_master.jpg?disable=upscale&auto=webp&quality=60&width=1400",
    //                     "https://a.1stdibscdn.com/love-knot-earrings-in-yellow-gold-w-triple-knot-11-millimeters-for-sale-picture-2/j_16051/j_124374121622653744225/IMG_6710_master.jpg?disable=upscale&auto=webp&quality=60&width=610",
    //                     "https://a.1stdibscdn.com/love-knot-earrings-in-yellow-gold-w-triple-knot-11-millimeters-for-sale/1121189/j_124374121625890476956/12437412_master.jpg?disable=upscale&auto=webp&quality=60&width=1400",
    //                     "https://a.1stdibscdn.com/love-knot-earrings-in-yellow-gold-w-triple-knot-11-millimeters-for-sale-picture-2/j_16051/j_124374121622653744225/IMG_6710_master.jpg?disable=upscale&auto=webp&quality=60&width=610",
    //                     "https://a.1stdibscdn.com/love-knot-earrings-in-yellow-gold-w-triple-knot-11-millimeters-for-sale-picture-4/j_16051/j_124374121622653747220/IMG_6712_master.jpg?disable=upscale&auto=webp&quality=60&width=610"
    //                 ],
    //                 "category": "earring",
    //                 "subcategory": "Stud",
    //                 "tags": [
    //                     "StudEarrings",
    //                     "ElegantEarrings",
    //                     "FashionJewelry",
    //                     "ChicAccessories",
    //                     "EarringGoals",
    //                     "TrendyStyle",
    //                     "Fashionista",
    //                     "JewelryAddict"
    //                 ],
    //                 "rating": 0
    //             },
    //             "metal": "14k solid yellow gold",
    //             "size": "8",
    //             "_id": "64d26b0fdd7b4a9da842230a"
    //         }
    //     ]
    // }

    const fetchCart = async () => {
        try {
            var res = await axios.get(`/customer/get/cart`);
            console.log(res.data);
            if (res.data.success) {
                setproducts(res.data.cart)
            } else {
            }
        } catch (error) {

        }
    }

    const deleteCart = async (id) => {
        try {
            var res = await axios.patch(`/customer/remove/cart/${id}`);
            if (res.data.success) {
                setproducts(products.filter(existingProduct => existingProduct._id !== id))
                showToast("1 Item removed");
            } else {
            }
        } catch (error) {
        }
    }

    const updateQuantity = (id, value) => {
        setproducts((prevProducts) => {
            return prevProducts.map((product) => {
                return (product.id === id) ? { ...product, quantity: (product.quantity + (value) >= 0) ? product.quantity + (value) : product.quantity } : product
            })
        });

    };

    //this is fucntion for checkbox before cart item:currently this functionlity is disables..
    // when user select item only  id add in selected product...
    // const handleItemselect = (event, doc) => {
    //     const clickedCheckbox = document.getElementById(event.target.id);
    //     if (clickedCheckbox.checked) {
    //         setselectedCartItemsIds(prevIds => [...prevIds, doc._id]);

    //     } else {
    //         setselectedCartItemsIds(selectedCartItemsIds.filter((id) => id !== doc._id));
    //     }
    // }

    useEffect(() => {
        fetchCart();
    }, [])

    useEffect(() => {
        console.log("useeffect");
        countTotal();
        // why this 2 varible? when this chnage total is count again...
    }, [products])

    // match selected product id with product and find total and set to totalAmount...
    const countTotal = () => {
        settotalAmount(0)
        console.log("countottal call");
        console.log(products);

        products.map((product) => {
            settotalAmount((previos) => previos + product.price * product.quantity);
        });

    }


    // send data for payment ....
    const checkOut = async () => {
        console.log("checkoyt call");


        var placeOrderData = {
            "order": {
                "address": {
                    "apartment": "Sardar Patel Soc.",
                    "pincode": 395004,
                    "city": "Surat",
                    "state": "Gujarat",
                    "country": "India"
                },
                "products": products.map((cartitem) => {
                    return {
                        "product": cartitem.product._id,
                        "metal": cartitem.metal,
                        "size": cartitem.size,
                        "quantity": cartitem.quantity

                    }
                }),

                "amount": totalAmount
            }
        }


        /////
        var data = {
            "products": products.map((product) => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: product.product.name,
                            description: 'Metal:' + product.metal + " " + 'Size:' + product.size
                        },
                        unit_amount: product.price,
                    },
                    quantity: product.quantity,
                }
            }
            )
        }

        try {
            var res = await axios.post(`/customer/payment`, data);

            if (res.data) {
                localStorage.setItem('placeOrderData', JSON.stringify(placeOrderData));
                window.location.href = res.data;
                showToast("Done");
            } else {
                // console.log(res.data);
                showToast("error")
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div id="cart-maindiv">

            <div id="cart-leftsubdiv">
                <div id="cart-subdiv-left-heading">
                    Your Cart
                </div>
                <hr></hr>
                {products && products.map((product) => {
                    {/* return <h1></h1> */ }
                    return <>
                        <div id="cart-leftsubdiv-cartitem">
                            {/* <div className="cart-leftsubdiv-cartitem-subdiv1" >
                                <input id={product._id} type="checkbox" onChange={(event) => handleItemselect(event, product)}></input>
                            </div> */}

                            <div className="cart-leftsubdiv-cartitem-subdiv2" >
                                {console.log("xxxxxxxxxxxxxxx")}
                                {console.log(`${import.meta.env.VITE_BACKEND_URL}${product.product.images[0]}`)}
                                <img src={`${import.meta.env.VITE_BACKEND_URL}${product.product.images[0]}`}></img>
                            </div>

                            <div className="cart-leftsubdiv-cartitem-subdiv3" >
                                <div className="cart-leftsubdiv-cartitem-subdiv3-titlediv">{product.product.name}</div>
                                <div className="cart-leftsubdiv-cartitem-subdiv3-pricediv"> ₹{(product.price * product.quantity)}</div>
                                <div className="cart-leftsubdiv-cartitem-subdiv3-sizediv"><span>Size : </span>{product.size}</div>
                                <div className="cart-leftsubdiv-cartitem-subdiv3-metaldiv"><span>Metal : </span>{product.metal}</div>

                                <div className="cart-leftsubdiv-cartitem-subdiv3-quantity-and-removediv-container">
                                    {/* quantity div */}
                                    <div className="cart-leftsubdiv-cartitem-subdiv3-quantitydiv"><span>Quantity : </span>
                                        <div className="quantitydiv-minus" onClick={() => updateQuantity(product.id, -1)}><div>-</div></div>
                                        <div className="quantitydiv-number">{product.quantity ? product.quantity : 1}</div>
                                        <div className="quantitydiv-plus" onClick={() => {
                                            updateQuantity(product.id, 1)
                                        }}><div>+</div></div>
                                    </div>

                                    {/* remove div */}

                                    <div className="cart-leftsubdiv-cartitem-subdiv3-removeitemdiv" onClick={() => { deleteCart(product._id) }}>Remove</div>
                                </div>


                            </div>

                        </div>
                        <hr></hr>
                    </>
                })}



            </div>

            <div id="cart-rightsubdiv">


                <div id="cart-rightsubdiv-heading">
                    Total Amount
                </div>

                <div id="cart-rightsubdiv-total">
                    {totalAmount}
                </div>

                <div id="cart-rightsubdiv-proceedtobuy" onClick={checkOut}>
                    <div >Proceed To Buy</div>
                </div>

            </div>


        </div>
    )
}

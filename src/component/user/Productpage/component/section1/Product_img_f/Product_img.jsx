import React, { useContext, useEffect, useRef, useState } from 'react'
import Usercontext from '../../../../context/Usercontext';
import { useParams } from 'react-router-dom';
export default function Product_img() {

    const [mainimg_src, setmainimg_src] = useState("");
    const { id } = useParams();
    const { fetchOneProduct,oneProduct } = useContext(Usercontext)

    const imagesliderRef = useRef(null);

  


    var product;
    useEffect(() => { 
       fetchOneProduct(id);
        if (imagesliderRef.current) {
            imagesliderRef.current.addEventListener('wheel', handleWheel);
        }
        return () => {
            if (imagesliderRef.current) {
                imagesliderRef.current.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);


// 2nd because when fetchOneProduct set then this exeute...
    useEffect(() => {
        oneProduct.images && setmainimg_src(oneProduct.images[0])
    }, [oneProduct])
    

    const handleWheel = (evt) => {
        evt.preventDefault();
        if (imagesliderRef.current) {
            imagesliderRef.current.scrollLeft += evt.deltaY;
        }
    };

    const previous = () => {
        console.log("clicked");
        var d = document.getElementById("product-img-subdiv2-imageslider"); 
        d.scrollLeft = d.scrollLeft + 50;
    };
    const next = () => {
        console.log("clicked");
        var d = document.getElementById("product-img-subdiv2-imageslider");
        d.scrollLeft = d.scrollLeft + 50;

    };

    //  big main image chnage onclick logic
    //also HOver too
    const imageonclick = (e) => {
        console.log(e.currentTarget.id);
        var index = e.currentTarget.id;
        setmainimg_src(oneProduct.images[index]);
    }

    var i = 0;
    return (
        <>
            <div id="product-img-maindiv">
                <div id="product-img-subdiv1">
                    <img src=
                        {`${import.meta.env.VITE_BACKEND_URL}${mainimg_src}`}></img>
                </div>
                <div id="product-img-subdiv2">
                    <div id="product-img-subdiv2-previous-btn" onClick={previous}>
                        <i className="ri-arrow-left-s-line"></i>
                    </div>

                    <div id="product-img-subdiv2-imageslider" ref={imagesliderRef}>

                        { oneProduct.images && oneProduct.images.map((imglink) => (

                     <div id="product-img-subdiv2-imageslider-imgdiv" key={i}  >
                                <img height={'100px'} width={'90px'} src= {`${import.meta.env.VITE_BACKEND_URL}${imglink}`} id={i++} key={i} onMouseEnter={imageonclick} onClick={imageonclick} />
                            </div>

                        )) }

                        {/* {console.log(allproduct && JSON.stringify(allproduct))} */}
                    </div>
                    <div id="product-img-subdiv2-next-btn" onClick={next}>
                        <i className="ri-arrow-right-s-line"></i>
                    </div>
                </div>
            </div>

        </>
    )
}

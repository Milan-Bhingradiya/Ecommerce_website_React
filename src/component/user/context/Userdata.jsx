import React, { useState } from 'react'
import Usercontext from './Usercontext'
import axios from '../axios.jsx';

//for toast
import { ToastContainer, toast } from 'react-toastify';


export default function Userdata(props) {
    const [isLogin, setIsLogin] = useState(false);
    const [userAuthToken, setuserAuthToken] = useState("x");
    const [userProfile, setuserProfile] = useState({})
    const [allproduct, setallproduct] = useState([]);


    //when user select category in navbar_2 this state use..
    const [category, setcategory] = useState(" ");
    const [selectedSubCategory, setselectedSubCategory] = useState(" ");
    const [selectedTags, setselectedTags] = useState(" ");
    const [selectedMetal, setselectedMetal] = useState(" ");


    //this index is use for productdetail page where we need which box is click by index
    const [oneProduct, setoneProduct] = useState({});

    /////////
    const [subcategory, setsubcategory] = useState([])
    const [metal, setmetal] = useState([])
    const [tags, settags] = useState([])




    //utility

    
    const showToast = (msg) => toast(msg);

    //////////////////////
    const getcategories = async () => {
        console.log("getcategory called")
        var res = await axios.get('/get/categories');
        var categories = await res.data.categories;
        console.log(res.data)

        //TODO: it is important dont delete...
        setsubcategory([])
        settags([])
        setmetal([])

        for (const subcategoryname in categories[category].subcategory) {
            setsubcategory((prevTags) => [...prevTags, subcategoryname])
        }
        for (const tag in categories[category].tags) {
            settags((prevTags) => [...prevTags, tag])
        }
        for (const metalname in categories[category].metal) {
            setmetal((prevTags) => [...prevTags, metalname])
            console.log("metal setted");
        }
    }

    const fetchproducts = async (filter = null) => {
        try {
            var res;
            if (filter == null) {
                var res = await axios.get(`/get/products`);
            } else {
                console.log("api calll for " + filter);
                var res = await axios.get(`/filter/products?${filter}`);
            }

            if (res.data.success === true) {
                console.log(res.data.products);
                setallproduct(res.data.products);
            } else {
                alert("something went wrong");
            }

        } catch (error) {
            console.log(error.response);
            alert("something went wrongm :" + error.message);
        }
    }


    const fetchOneProduct = async (id) => {
        var res = await axios.get(`get/product/${id}`)
        console.log(res.data.product);
        setoneProduct(res.data.product)
    }


    return (
        <Usercontext.Provider value={{

            //utility
            showToast,
            //
            isLogin, setIsLogin, userAuthToken, setuserAuthToken, userProfile, setuserProfile,

            //
            metal, subcategory, getcategories,

            //
            allproduct, fetchproducts,

            //
          setcategory, category,

            //
            selectedSubCategory, setselectedSubCategory, selectedTags, setselectedTags, selectedMetal, setselectedMetal, fetchOneProduct,oneProduct,
        }}>
            {props.children}
        </Usercontext.Provider>
    )
}




import { Cancel } from '@mui/icons-material';
import { Autocomplete, Box, Button, Checkbox, Container, IconButton, Stack, TextField, TextareaAutosize, Typography, makeStyles, styled, useMediaQuery, useTheme } from '@mui/material'
import { green, grey } from '@mui/material/colors';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Tag from '../global/Tag';
import AddIcon from '@mui/icons-material/Add';
import Merchantcontext from '../context/Merchantcontext';
import axios from '../axios';
import Uploadimg from './Uploadimg';
import NameAndDesc from './NameAndDesc';
import CategoryAndSubcategory from './CategoryAndSubcategory';
import MetalAndPrice from './MetalAndPrice';
import Tags from './Tags';

function AddproductPage() {
    const Submitbtn = styled(Box)({
        height: '50px',
        width: '100%',
        backgroundColor: 'grey',
        borderRadius: '6px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    })

    const { isEditMode, oneProductDetaill_Edit } = useContext(Merchantcontext)

    //states

    const [productData, setproductData] = useState({
        "name": "",
        "description": "",
        "images": [],
        "category": "",
        "subcategory": "",
        "metal": {},
        "tags": [],
    })

    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [selectedMetal, setselectedMetal] = useState([]);
    const [allmetallist, setallmetallist] = useState([]);



    //----------upload images---------------------------------------------
    const [files, setfiles] = useState([]);
    const uploadimages = async (id) => {
        console.log("calll upload");
        const formData = new FormData();
        if (!files.length==0) {
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]);
            }


            try {
                var res = await axios.patch(`/merchant/upload/productImages/${id}`, formData);
                console.log("following is api response");
                console.log(res.data.success);
                console.log(res.data.success);
            } catch (error) {
                console.log(error);
                alert("something went wrongm :" + error.message);
            }
        }

      
    }



    
//////////////// submit form ///////////////////////////////////////////////////////////////////////////////

    const handlesubmitOnclick = () => {
        // metal and price ....
        const updatedData = Object.fromEntries(
            Object.entries(productData.metal ).filter(([key]) => selectedMetal.includes(key))
        );

        var newProductData=productData;
        newProductData = {
            ...newProductData,
            metal: updatedData
          };

        // DONT DO THIS... this will not set before api call soo...
        // setproductData((prev) => ({
        //     ...prev,
        //     metal: updatedData
        // }))
        isEditMode?updateProductApicall(productData._id,newProductData):addproductApicall(newProductData);
    }




    const addproductApicall = async (newProductData) => {
        const data = {
            "product": newProductData
        }
        try {
            var res = await axios.post(`/merchant/register/product`, data);
            console.log(res.data.success);
            const id = res.data.product._id;
            if (res.data.success) {
                uploadimages(id);
                alert("done")
            }

        } catch (error) {
            console.log(error);
            alert("something went wrongm :" + error.message);
        }
    }

    
    const updateProductApicall = async (id,newProductData) => {
        console.log("yyyyyyyyyyy");
        console.log(productData);
        const data = {
            "product": newProductData
        }

      
        try {
            var res = await axios.patch(`/merchant/update/product/${id}`, data);
            console.log(res.data.success);
            if (res.data.success) {
                uploadimages(id);
                alert(" updatedone")
                
            }

        } catch (error) {
            console.log(error);
            alert("something went wrongm :" + error.message);
        }
    }

//////////////// for EDIT Mode ///////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        if (isEditMode) {
            setproductData(
                oneProductDetaill_Edit);
            setselectedMetal(Object.keys(oneProductDetaill_Edit.metal))
            console.log(productData);
            console.log(productData);
            console.log(productData);
        }

    }, [])

    return (

        <Box m={1} minHeight={'100%'} height={'auto'} sx={{ bgcolor: theme.palette.secondary.main }}  >
            <Box pl={isMdScreen ? 0.5 : 6} pr={isMdScreen ? 2 : 6} pt={5}>

                {/* ///////// Upload Image/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                <Uploadimg files={files} setfiles={setfiles} setproductData={setproductData} productData={productData} />
                <NameAndDesc setproductData={setproductData} productData={productData} isEditMode={isEditMode} />

                <CategoryAndSubcategory productData={productData} setproductData={setproductData} setallmetallist={setallmetallist} allmetallist={allmetallist}/>

                <MetalAndPrice setselectedMetal={setselectedMetal} selectedMetal={selectedMetal} productData={productData} setproductData={setproductData} setallmetallist={setallmetallist} allmetallist={allmetallist} />

                <Tags productData={productData} setproductData={setproductData} />

                {/* //////////// SuBmit button//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                <Submitbtn mt={4} onClick={handlesubmitOnclick}>
                    <Typography fontSize={25}>
                        Submit
                    </Typography>
                </Submitbtn>
                {/* /////////////////////////Extra but imp /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                <Box height={50}>
                </Box>
            </Box>
        </Box>
    )
}

export default AddproductPage
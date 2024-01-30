import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { Delete } from '@mui/icons-material';
import dotenv from 'dotenv'

import axios from '../axios';
import Merchantcontext from '../context/Merchantcontext';

// dotenv.config();

function GetallproductPage() {


    var fomatdate = (datestr) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            // timeZoneName: 'short'
        };

        const dateObj = new Date(datestr);

        return dateObj.toLocaleString('en-US', options);
    }

    ///////

    const { setoneProductDetaill_Edit, setselectedSideBarItem, setisEditMode, } = useContext(Merchantcontext);
    const [allproduct, setallproduct] = useState([]);

    // for showing detail of any product ,once ...
    const [oneproduct, setoneproduct] = useState({});

    const [openProductModal, setopenProductModal] = useState(false);
    const [openDeleteModal, setopenDeleteModal] = useState(false);
    const [openEditModal, setopenEditModal] = useState(false);

    const [idForDelete, setidForDelete] = useState("");
    const fetchAllProduct = async () => {
        var res = await axios.get('merchant/get/products');

        setallproduct(res.data.products);
        console.log(allproduct);
        console.log(allproduct);
        console.log(allproduct);
    }


    useEffect(() => {
        fetchAllProduct();
    }, [])
    const modalstyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const handleClose = () => {
        setopenProductModal(false);
    };

    const closeDeleteModal = () => {
        setopenDeleteModal(false);
    };


    const deleteProduct = async (productid) => {
        console.log(productid);
        console.log(productid);
        console.log(productid);
        console.log(productid);
        try {
            var res = await axios.delete(`/merchant/delete/product/${productid}`);

            console.log(res.data.success) // here print true 
            if (res.data.success) {
                console.log("aaaaaaaaaaa");
                setallproduct(
                    allproduct.filter((product) => {
                        return product._id !== productid
                    }))
                setopenDeleteModal(false);
            } else {
                alert("try again later")
                setopenDeleteModal(false);
            }

        } catch (error) {
            setopenDeleteModal(false);
            console.log("xxxx");
        }

    }



    return (
        <>
            {/* /////////////////////// Product info show modal /////////////////////////////////////// */}
            <Modal
                open={openProductModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >


                <Box sx={modalstyle} >
                    <Typography mt={2} fontSize={15}>

                    </Typography>
                    <Stack direction={'row'}>
                        {console.log(oneproduct.images)}
                        {oneproduct.images && oneproduct.images.map((imgurl) => {
                            return <Box key={`${imgurl}`} >
                                <img height={80} width={80} src={`${import.meta.env.VITE_BACKEND_URL}${imgurl}`}></img>
                            </Box>
                        })}

                    </Stack>

                    <Typography mt={2} fontWeight={500} fontSize={15}>
                        {oneproduct.name}
                    </Typography>

                    <Stack direction={'row'} gap={2} mt={1} mb={1}>
                        <Typography fontSize={15}>
                            Category: {oneproduct.category}
                        </Typography>
                        <Typography fontSize={15} >
                            Subcategory:  {oneproduct.subcategory}
                        </Typography>
                    </Stack>



                    {/* ------------------------------------------------------------- */}
                    <Stack direction={'row'}>
                        <Box mr={5} boxShadow={'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'} p={2} flex={1}>

                            <Typography mb={0.2} fontSize={17} fontWeight={500}>
                                Metal Name and Price
                            </Typography>
                            {
                                oneproduct.metal && Object.entries(oneproduct.metal).map((field) => {
                                    return <Box key={field[0]} display={'flex'} flexDirection={'row'} fontSize={15} >
                                        <Box flex={20} >{field[0]}</Box>
                                        <Box flex={0.5}>{" : "}</Box>
                                        <Box flex={1}>{field[1]}</Box>
                                    </Box>
                                })
                            }
                        </Box>


                        <Box boxShadow={'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'} p={2} flex={1} >
                            <Typography mb={0.2} fontSize={17} fontWeight={'fontWeightMedium'}>
                                Tags
                            </Typography>
                            {
                                oneproduct.tags && oneproduct.tags.map((tag) => {
                                    return <Typography key={tag} fontSize={15}>
                                        <span>{tag}</span>
                                    </Typography>
                                })
                            }
                        </Box>
                    </Stack>

                    <Stack mt={2} direction={'row'}>
                        <Typography fontSize={15}>
                            {"Created :" + fomatdate(oneproduct.createdAt)}
                        </Typography>
                        <Box m={1}></Box>

                        <Typography fontSize={15}>
                            {"updated :" + fomatdate(oneproduct.updatedAt)}
                        </Typography>

                    </Stack>

                    {/* ------------------------------------------------------------- */}

                </Box>
            </Modal>

            {/* ////////////// Are u sure delete modal/////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Modal
                open={openDeleteModal}
                onClose={closeDeleteModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalstyle} width={550} >
                    <Typography fontSize={18} fontWeight={500}>
                        Are u sure For Delete This Product?
                    </Typography>
                    <Typography fontSize={14}>
                        Note: after delete this product u will not able to get back this product details so chhoose option wiseley
                    </Typography>

                    <Stack direction={'row'} mt={2} gap={2}>
                        <Button variant="contained" size='large' sx={{ bgcolor: 'grey' }} onClick={closeDeleteModal}>Cancel</Button>

                        <Button variant="contained" size='large' color="error" startIcon={<Delete />} onClick={() => { deleteProduct(idForDelete) }} >
                            Delete
                        </Button>

                    </Stack>
                </Box>
            </Modal>



            {/* ////////////// Are u sure Edit modal/////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Modal
                open={openEditModal}
                onClose={() => { setopenEditModal(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalstyle} width={550} >
                    <Typography fontSize={18} fontWeight={500}>
                        Are u sure For Edit This Product detail?
                    </Typography>
                    <Typography fontSize={14}>
                        Note: after delete this product u will not able to get back this product details so chhoose option wiseley
                    </Typography>

                    <Stack direction={'row'} mt={2} gap={2}>
                        <Button variant="contained" size='large' sx={{ bgcolor: 'grey' }} onClick={() => { setopenEditModal(false) }}>Cancel</Button>

                        <Button variant="contained" size='large' color="error" startIcon={<Delete />} onClick={() => { setisEditMode(true); setoneProductDetaill_Edit(oneproduct); setselectedSideBarItem("addproduct") }}  >
                            EDIT
                        </Button>

                    </Stack>
                </Box>
            </Modal>


            {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <Box display={'flex'} flexWrap={'wrap'}>

                {allproduct && allproduct.map((product) => {
                    {/* return  <Box  key={product._id} height={250} m={2} bgcolor={'white'} sx={{ width: '510px', borderRadius: '10px',  display: 'flex', flexDirection: 'row', justifyContent: 'center',p:'10px' ,boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}> */ }
                    return <Box key={product._id} m={2} bgcolor={'white'} sx={{ width: '510px', p: '10px', borderRadius: '10px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                            <Box flex={1} pt={1} pb={1} pl={1} >

                                <img height={110} width={110} src={`${import.meta.env.VITE_BACKEND_URL}${product.images[0]}`} >
                                </img>
                            </Box>
                            <Box flex={2.5} border={0}>
                                <Typography mt={2}>
                                    {product.name}
                                </Typography>
                                <Typography mt={1}>
                                    Category: {product.category}
                                </Typography>
                                <Typography mb={2}>
                                    Subcategory:  {product.subcategory}
                                </Typography>
                            </Box>
                        </Box>



                        <Stack direction={'row'} gap={1} p={1} flexWrap={'wrap'}>
                            <Button variant="contained" size="small" sx={{ bgcolor: 'grey' }} onClick={() => { setoneproduct(product); setopenProductModal(!openProductModal) }}>
                                Watch ALL detail
                            </Button>

                            <Button variant="contained" size="small" sx={{ bgcolor: 'grey' }} onClick={() => { setoneproduct(product); setopenEditModal(true) }}>
                                Edit

                            </Button>

                            <Button variant="contained" color="error" size="small" startIcon={<Delete />} onClick={() => { setidForDelete(product._id); setopenDeleteModal(true) }}>

                                Remove

                            </Button>

                        </Stack>
                    </Box>
                })}

            </Box>
        </>
    )
}

export default GetallproductPage
import React, { useContext } from 'react'
import { Autocomplete, Badge, Box, Button, Checkbox, Container, IconButton, Stack, TextField, TextareaAutosize, Typography, makeStyles, styled, useMediaQuery, useTheme } from '@mui/material'

import AddIcon from '@mui/icons-material/Add';
// import axios from '../axios';
import { useState } from 'react';
import Merchantcontext from '../context/Merchantcontext';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
function Uploadimg({ setfiles, files, setproductData, productData }) {


    //----------upload images---------------------------------------------
    const [selectedImages, setSelectedImages] = useState([]);




    const selectMultipleFiles = (e) => {
        const filestemp = e.target.files;
        const imageArray = Array.from(filestemp);

        setSelectedImages([...selectedImages, ...imageArray]);
        // setproductData((prev) => ({
        //     ...prev,
        //     images: [...prev.images, ...imageArray],


        // }))
        console.log("kkkkkkkkkkkkkkkkk");
        // console.log(typeof (e.target.files));
        setfiles([...files, ...Object.values(e.target.files)]);
        console.log(files.length);

    };
const deleteimg=(deleteurl)=>{
    
    setproductData(prevData => ({
        ...prevData,
        images: prevData.images.filter(url => url !== deleteurl)
    }));

}
    return (
        <>
            <Typography mb={2} fontSize={25}>
                Upload Images
            </Typography>
            <Stack m={2} direction={'row'} flexWrap={'wrap'}>

                {productData && productData.images.map((image, index) => (
                    <Badge key={index} badgeContent={ <Box onClick={(e)=>{deleteimg(image)}} mt={1} mr={1} bgcolor={'grey'} sx={{borderRadius:'50%' , transform: 'translate(-6px, 5px)'}} ><CloseOutlinedIcon /></Box>}>
                      
                    <Box key={index} gap={5}>
                        <img
                            height={150}
                            width={150}
                            src={`${import.meta.env.VITE_BACKEND_URL}` + image}
                            alt={`Selected ${index}`}
                            className="selected-image"
                        />
                    </Box>
                    </Badge>
                ))}
                {selectedImages && selectedImages.map((image, index) => (
                        <Badge key={index} badgeContent={ <Box onClick={(e)=>{deleteimg(image)}} mt={1} mr={1} bgcolor={'grey'} sx={{borderRadius:'50%' , transform: 'translate(-6px, 5px)'}} ><CloseOutlinedIcon /></Box>}>
                           
                    <Box gap={5}  border={1}  m={0.5}>
                        <img
                            height={150}
                            width={150}
                            src={URL.createObjectURL(image)}
                            alt={`Selected ${index}`}
                            className="selected-image"
                        />
                    </Box>
                        </Badge>
                ))}

                {selectedImages.length == 0 && <Box height={100} width={100} border={1} borderRadius={2} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                    <IconButton size="large" >
                        <AddIcon fontSize='inherit' />
                    </IconButton>
                </Box>}
            </Stack>

            <input
                multiple
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: "none" }}
                onChange={selectMultipleFiles}
            />

            <label htmlFor="select-image">
                <Button variant="contained" component="span" sx={{ bgcolor: 'grey' }}>
                    Choose Image
                </Button>
            </label>
        </>

    )
}

export default Uploadimg
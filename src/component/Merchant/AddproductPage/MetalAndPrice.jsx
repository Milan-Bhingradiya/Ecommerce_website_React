import React, { useContext, useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Checkbox, Container, IconButton, Stack, TextField, TextareaAutosize, Typography, makeStyles, styled, useMediaQuery, useTheme } from '@mui/material'
import Merchantcontext from '../context/Merchantcontext';
import { grey } from '@mui/material/colors';

function MetalAndPrice({ setselectedMetal, selectedMetal, setproductData, productData ,allmetallist}) {

    const theme = useTheme();


    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));


    const { categories, getcategories, isEditMode, setisEditMode, oneProductDetaill_Edit } = useContext(Merchantcontext);



    const handle_checkbox_onclick = (e) => {
        if (!e.target.checked) {
            setselectedMetal((prev) => {
                return prev.filter(item => item !== e.target.name);
            })
        } else {
            setselectedMetal((prev) => {
                return [...prev, e.target.name];
            })
        }


    }

    const handle_Pricetextfield = (e) => {
        setproductData((prev) => ({
            ...prev,
            "metal": { ...prev.metal, [e.target.name]: e.target.value }
        }))
        // setmetal({ ...metal, [e.target.name]: e.target.value })
    }


    
    return (
        <>
            <Typography mt={2}>
                Metal <span>{selectedMetal.length}</span> and Thier price
            </Typography>

            <Box border={1}>
                <Stack direction={'row'} pt={1} pb={1} bgcolor={grey[200]}>
                    <Box flex={1} >
                        <Typography ml={1} fontSize={18} fontWeight={500}>
                            Select
                        </Typography>
                    </Box>

                    <Box ml={5} flex={3}>
                        <Typography ml={1} fontSize={18} fontWeight={500}>
                            Metal name
                        </Typography>
                    </Box>

                    <Box flex={1}>
                        <Typography fontSize={18} fontWeight={500}>
                            Price
                        </Typography>
                    </Box>
                </Stack>

                {

                    Object.keys(productData.metal).map((objkey) => {
                        return <Stack key={objkey} direction={'row'} mt={1}>
                            <Box flex={isMdScreen ? 1 : 1} >
                            {selectedMetal.includes(objkey) &&  <Checkbox  checked={true} name={objkey} onClick={(e) => handle_checkbox_onclick(e)} size="small" />}
                               {!selectedMetal.includes(objkey) &&  <Checkbox  name={objkey} onClick={(e) => handle_checkbox_onclick(e)} size="small" />}
                            </Box>

                            <Box ml={5} flex={isMdScreen ? 5 : 3}>
                                <Typography p={1}>
                                    {objkey} </Typography>
                            </Box>

                            <Box flex={isMdScreen ? 2 : 1}>
                                <Typography>
                                    <TextField
                                        name={objkey}
                                        id="outlined-number"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        size='small'
                                        value={productData.metal[objkey]}
                                        onChange={handle_Pricetextfield}
                                    />
                                </Typography>
                            </Box>
                        </Stack>
                    })

                }

{/* 
                {
                    allmetallist.map((metalname) => {
                        return <Stack key={metalname} direction={'row'} mt={1}>
                            <Box flex={isMdScreen ? 1 : 1} >
                            <Checkbox  name={allmetallist} onClick={(e) => handle_checkbox_onclick(e)} size="small" />
                            </Box>

                            <Box ml={5} flex={isMdScreen ? 5 : 3}>
                                <Typography p={1}>
                                    {allmetallist} </Typography>
                            </Box>

                            <Box flex={isMdScreen ? 2 : 1}>
                                <Typography>
                                    <TextField
                                        name={allmetallist}
                                        id="outlined-number"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        size='small'
                                        // value={productData.metal[objkey]}
                                        onChange={handle_Pricetextfield}
                                    />
                                </Typography>
                            </Box>
                        </Stack>
                    })

                } */}

            </Box>
        </>
    )
}

export default MetalAndPrice
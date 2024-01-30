import React, { useContext, useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Checkbox, Container, IconButton, Stack, TextField, TextareaAutosize, Typography, makeStyles, styled, useMediaQuery, useTheme } from '@mui/material'
import Merchantcontext from '../context/Merchantcontext';

function CategoryAndSubcategory({ setproductData, productData }) {


    const { categories, getcategories, isEditMode, oneProductDetaill_Edit } = useContext(Merchantcontext)
    // --------------------------Category ------------------------

    const [categorylist, setcategorylist] = useState([]);
    const [subcategorylist, setsubcategorylist] = useState([]);


    const make_metallist = (categoryName) => {
        Object.entries(categories).map((field) => {
            if (field[0] !== "_id") {
                if (categoryName === field[0]) {
                    console.log("ahhhhhhhhhhhh");
                    console.log(field[1].metal);


                    // setallmetallist(Object.keys(field[1].metal));
                    var allmetallist = Object.keys(field[1].metal);
                    const checkedMetallist = Object.keys(productData.metal);



                    // newmetal that is not checked .........    
                    var newmetal = allmetallist.filter((metal) => !checkedMetallist.includes(metal));

                    // console.log(allmetallist);
                    // console.log(checkedMetallist);
                    // console.log(Object.keys(field[1].metal));
                    // console.log(newmetal);
                    // here i make list of metal and price 0  ................
                    setproductData((prev) => ({
                        ...prev,
                        "metal": newmetal.reduce((updatedMetal, newKey) => {
                            updatedMetal[newKey] = 0;
                            return updatedMetal;
                        }, { ...prev.metal }),
                    }))





                }

            }
        });

    }


    const getcategorylist = async () => {
        console.log("new categorylist setteed");
        var temp = [];
        Object.entries(categories).map((field) => {
            if (field[0] !== "_id" && field[0] !== "updatedAt") {
                console.log(field[0]);
                temp = [...temp, field[0]];
            }
        });
        console.log(temp);
        setcategorylist(temp);
    }
    // give subcategory on category name passed in arguments....
    const set_subcategorylist = (categoryname) => {
        // categoryname = categoryname.toLowerCase();
        // console.log(categoryname);
        // console.log(categoryname);
        // console.log(categoryname);
        console.log(categories);

        var temp = [];
        Object.entries(categories).map((field) => {
            console.log(field[0]);
            if (field[0] !== "_id") {
                if (categoryname === field[0]) {
                    Object.entries(field[1].subcategory).map((subcategoryField) => {
                        temp = [...temp, subcategoryField[0]]
                    })
                }
                console.log(temp);
                setsubcategorylist(temp);
            }
        });

    }


    const setselectedCategory = (value) => {
        setproductData((prev) => ({
            ...prev,
            category: value
        }))

    }
    const setselectedSubcategory = (value) => {
        setproductData((prev) => ({
            ...prev,
            subcategory: value
        }))

    }


    useEffect(() => {
        getcategories();
    }, [])


    useEffect(() => {

        getcategorylist();
    }, [categories])

    return (
        <>
            <Stack mt={2} direction={'row'} gap={4}>
                <Box flex={2}>
                    <Autocomplete
                        onInputChange={(e, value) => {
                            if (value) {
                                make_metallist(value);
                                setselectedCategory(value);
                                set_subcategorylist(value);
                            }
                        }}
                        // onChange={(e, value) => { make_metallist(value); setselectedCategory(value); set_subcategorylist(value) }}
                        size="small"
                        value={productData.category}
                        // disablePortal
                        id="combo-box-demo"
                        options={categorylist}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} variant="outlined" label="select category" />}
                    />

                </Box>
                <Box flex={2}>
                    <Autocomplete
                        onChange={(e, value) => { setselectedSubcategory(value); }}
                        size="small"
                        value={productData.subcategory}
                        // disablePortal
                        id="combo-box-demo"
                        options={subcategorylist}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} variant="outlined" label="select Subcategory" />}
                    />
                </Box>
                <Box flex={4}>
                </Box>
            </Stack>
        </>
    )
}

export default CategoryAndSubcategory
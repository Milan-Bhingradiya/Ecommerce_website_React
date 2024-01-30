import { Box, Stack, TextField, TextareaAutosize, Typography } from '@mui/material'
import React from 'react'

function NameAndDesc({ setproductData,productData,isEditMode, }) {

    const handleNameAndDescOnChange = (e) => {

        setproductData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))

    }
    return (
        <>
            <Typography mt={10} mb={2} fontSize={25}>
                Enter Product Detail
            </Typography>
            <Box>
                <TextField value={ productData.name} size="small" name="name" onChange={handleNameAndDescOnChange} variant="outlined" sx={{ width: '100%' }} />
            </Box>

            <Stack
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                spacing={2}
                mt={1}
            >
                {/* ////////////// PRODUCT Description///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                <Typography >
                    Description
                </Typography>

                <TextareaAutosize
                    value={productData.description}
                    name="description"
                    onChange={handleNameAndDescOnChange}
                    minRows={3}
                    maxRows={6}
                />

            </Stack>
        </>)
}

export default NameAndDesc
import { Box, Stack, TextField, Typography } from '@mui/material';
import Tag from '../global/Tag';
import { useRef } from 'react';

function Tags({productData,setproductData}) {

    const tagRef = useRef();

    const handleOnSubmit = (e) => {
        e.preventDefault();

        setproductData((prev) => ({
            ...prev,
            tags: [...prev.tags, tagRef.current.value],
        }));
        tagRef.current.value = "";
    };

    const handleDelete = (value) => {
        const newtags = productData.tags.filter((val) => val !== value);
        setproductData((prev) => ({
            ...prev,
            tags: newtags

        }))
    };
  return (

    <Box mt={2} >

    <Typography mt={2}>
        Enter Tags
    </Typography>

    <form onSubmit={handleOnSubmit}>

        <Stack direction={'row'} flexWrap={'wrap'}>
            {productData.tags.map((data, index) => {
                return (
                    <Tag name={data} key={index} handleDelete={handleDelete} />
                );
            })}
            <div style={{ display: 'inline-block' }}>
                <TextField
                    inputRef={tagRef}
                    id="inputtag_textfiled"
                    fullWidth
                    size='small'
                    placeholder="Enter Tags here"

                />

            </div>
        </Stack>
    </form>
</Box>
    )
}

// Tags.PropTypes={
//     productData:PropTypes.object,
//     setproductData:PropTypes.func

// }
export default Tags
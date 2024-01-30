import { Cancel } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";


function Tag({ name, handleDelete }) {
    return (

        <Box
            sx={{
                background: "#283240",
                height: "34px",
                padding: "0.3rem",
                margin: "2px",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                color: "#ffffff",
                borderRadius: "4px"
            }}
        >
            <Stack direction='row' gap={1}>
                <Typography fontSize={14}>{name}</Typography>
                <Cancel
               
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                        handleDelete(name);
                    }}
                />
            </Stack>
        </Box>
    )
}

export default Tag
import { ProductionQuantityLimits } from '@mui/icons-material';
import {
  Box,
  Drawer, Typography, styled, useTheme,
} from '@mui/material';
import { useContext } from 'react';
import Merchantcontext from '../context/Merchantcontext';

function Sidebar() {

  const { opensidebar, setopensidebar,selectedSideBarItem,setselectedSideBarItem,setisEditMode } = useContext(Merchantcontext);

  const theme = useTheme();

  const SideBaritem = styled(Box)({
    mt: 2,
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
    ':hover': { backgroundColor: theme.palette.background.default }

  })

  return (
    <>
      <Drawer variant="persistent" open={opensidebar} ModalProps={{
        disableBackdropClick: true,
        disableEscapeKeyDown: true,
      }} onClose={() => { setopensidebar(false) }}

        elevation={2} sx={{
          '& .MuiDrawer-paper': {
            width: '210px',
            boxSizing: 'border-box',
            bgcolor: theme.palette.primary[400],

          },
        }}
      >
        <Box  px={5} mt={3} display={'flex'} justifyContent={'center'}  >
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} >
            <img style={{ borderRadius: '50%', height: '70px', width: '70px' }} src="https://picsum.photos/50">
            </img>
            <Typography mt={1} fontSize={20}>
              Milan op
            </Typography>
          </Box>
        </Box>

        <SideBaritem mt={2} onClick={()=>{ setisEditMode(false); setselectedSideBarItem("addproduct") }}>
          <ProductionQuantityLimits />
          <Typography fontSize={15}>Add Product</Typography>
        </SideBaritem>
        {/* <SideBaritem >
          <ProductionQuantityLimits />
          <Typography fontSize={15}>Edit Your Product</Typography>
        </SideBaritem> */}
        <SideBaritem onClick={()=>{setselectedSideBarItem("allproduct") }} >
          <ProductionQuantityLimits />
          <Typography fontSize={15}>ALL Product</Typography>
        </SideBaritem>
        {/* <SideBaritem >
          <ProductionQuantityLimits />
          <Typography fontSize={15}>Upload Your Product</Typography>
        </SideBaritem> */}


      </Drawer>


    </>
  )
}

export default Sidebar
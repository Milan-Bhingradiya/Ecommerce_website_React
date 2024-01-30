import { Box, Stack, } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
// import { blue, green, grey, red } from '@mui/material/colors';
import { useContext } from 'react';
import Merchantcontext from '../context/Merchantcontext';



function Navbar() {
  // const theme = useTheme();

  const { opensidebar, setopensidebar } = useContext(Merchantcontext);



  return (
    <>

      {/* <StyledAppBar>sjn</StyledAppBar> */}
      {/* <Box sx={opensidebar?{bgcolor:'black', height:'200px', width:'100%',transition: 'width 0.8s ease, margin 0.8s ease'}:{bgcolor:'black',height:'70%',width:'300px',transition: 'width 0.8s ease, margin 0.8s ease'}  }> */}
      <Box open={opensidebar}   >
        <Stack direction={'row'} >
          <Box margin={1.2} onClick={() => { setopensidebar(!opensidebar) }}>
            <MenuIcon sx={{ color: 'black' }}  ></MenuIcon>
          </Box>
        </Stack>
      </Box>
      {/* </Box> */}
    </>
  )
}

export default Navbar